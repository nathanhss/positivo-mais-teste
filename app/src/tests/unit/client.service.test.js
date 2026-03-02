jest.mock("../../repositories/client.js");
jest.mock("../../utils/logger.js", () => ({
    __esModule: true,
    default: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import ClientRepository from "../../repositories/client.js";
import ClientService from "../../services/client.js";

describe("ClientService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should create a client and return 201 with success response", async () => {
            const input = {
                name: "John Doe",
                email: "john.doe@example.com",
                document: "1234567890",
                username: "john.doe",
                password: "123456",
            };

            const createdClient = {
                _id: "507f1f77bcf86cd799439011",
                ...input,
                status: "active",
                created_at: new Date(),
                updated_at: new Date(),
            };

            delete createdClient.password;

            ClientRepository.create.mockResolvedValue(createdClient);

            const result = await ClientService.create(input);

            expect(ClientRepository.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    name: input.name,
                    email: input.email,
                    document: input.document,
                    username: input.username,
                }),
            );
            expect(
                typeof ClientRepository.create.mock.calls[0][0].password,
            ).toBe("string");
            expect(result.code).toBe(201);
            expect(result.success).toBe(true);
            expect(result.message).toBe("Client created successfully");
            expect(result.data).toBeDefined();
            expect(result.data.name).toBe("John Doe");
            expect(result.data.email).toBe("john.doe@example.com");
            expect(result.data.document).toBe("1234567890");
            expect(result.data.username).toBe("john.doe");
            expect(result.data._id).toBe(createdClient._id);
        });

        it("should return 404 when repository does not create client", async () => {
            ClientRepository.create.mockResolvedValue(null);

            const result = await ClientService.create({
                name: "John",
                email: "john@example.com",
                document: "123",
                username: "john",
                password: "123456",
            });

            expect(result.code).toBe(404);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Client not created");
            expect(result.data).toBeNull();
        });

        it("should return 500 on repository error", async () => {
            ClientRepository.create.mockRejectedValue(new Error("DB error"));

            const result = await ClientService.create({
                name: "John",
                email: "john@example.com",
                document: "123",
                username: "john",
                password: "123456",
            });

            expect(result.code).toBe(500);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Internal server error");
            expect(result.data).toBeNull();
        });
    });

    describe("getAll", () => {
        it("should return 200 and list of clients", async () => {
            const clients = [
                { _id: "1", name: "John", email: "john@example.com" },
            ];
            ClientRepository.getAll.mockResolvedValue(clients);

            const result = await ClientService.getAll();

            expect(ClientRepository.getAll).toHaveBeenCalled();
            expect(result.code).toBe(200);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(clients);
        });

        it("should return 500 on repository error", async () => {
            ClientRepository.getAll.mockRejectedValue(new Error("DB error"));

            const result = await ClientService.getAll();

            expect(result.code).toBe(500);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Internal server error");
            expect(result.data).toBeNull();
        });
    });

    describe("getById", () => {
        it("should return 200 and client when found", async () => {
            const id = "507f1f77bcf86cd799439011";
            const client = {
                _id: id,
                name: "John Doe",
                email: "john@example.com",
            };
            ClientRepository.getById.mockResolvedValue(client);

            const result = await ClientService.getById(id);

            expect(ClientRepository.getById).toHaveBeenCalledWith(id);
            expect(result.code).toBe(200);
            expect(result.success).toBe(true);
            expect(result.message).toBe("Client found successfully");
            expect(result.data).toEqual(client);
        });

        it("should return 404 when client is not found", async () => {
            ClientRepository.getById.mockResolvedValue(null);

            const result = await ClientService.getById("inexistent-id");

            expect(result.code).toBe(404);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Client not found");
            expect(result.data).toBeNull();
        });

        it("should return 500 on repository error", async () => {
            ClientRepository.getById.mockRejectedValue(new Error("DB error"));

            const result = await ClientService.getById("some-id");

            expect(result.code).toBe(500);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Internal server error");
            expect(result.data).toBeNull();
        });
    });

    describe("update", () => {
        it("should return 200 and updated client when found", async () => {
            const id = "507f1f77bcf86cd799439011";
            const payload = { name: "Jane Doe", email: "jane@example.com" };
            const updatedClient = { _id: id, ...payload, status: "active" };
            ClientRepository.update.mockResolvedValue(updatedClient);

            const result = await ClientService.update(id, payload);

            expect(ClientRepository.update).toHaveBeenCalledWith(id, payload);
            expect(result.code).toBe(200);
            expect(result.success).toBe(true);
            expect(result.message).toBe("Client updated successfully");
            expect(result.data).toEqual(updatedClient);
        });

        it("should return 404 when client is not found", async () => {
            ClientRepository.update.mockResolvedValue(null);

            const result = await ClientService.update("inexistent-id", {
                name: "Jane",
            });

            expect(result.code).toBe(404);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Client not found");
            expect(result.data).toBeNull();
        });

        it("should return 500 on repository error", async () => {
            ClientRepository.update.mockRejectedValue(new Error("DB error"));

            const result = await ClientService.update("some-id", {
                name: "Jane",
            });

            expect(result.code).toBe(500);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Internal server error");
            expect(result.data).toBeNull();
        });
    });

    describe("delete", () => {
        it("should return 200 and deleted client when found", async () => {
            const id = "507f1f77bcf86cd799439011";
            const deletedClient = { _id: id, name: "John Doe" };
            ClientRepository.delete.mockResolvedValue(deletedClient);

            const result = await ClientService.delete(id);

            expect(ClientRepository.delete).toHaveBeenCalledWith(id);
            expect(result.code).toBe(200);
            expect(result.success).toBe(true);
            expect(result.message).toBe("Client deleted successfully");
            expect(result.data).toEqual(deletedClient);
        });

        it("should return 404 when client is not found", async () => {
            ClientRepository.delete.mockResolvedValue(null);

            const result = await ClientService.delete("inexistent-id");

            expect(result.code).toBe(404);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Client not deleted");
            expect(result.data).toBeNull();
        });

        it("should return 500 on repository error", async () => {
            ClientRepository.delete.mockRejectedValue(new Error("DB error"));

            const result = await ClientService.delete("some-id");

            expect(result.code).toBe(500);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Internal server error");
            expect(result.data).toBeNull();
        });
    });

    describe("patch", () => {
        it("should return 200 and patched client when client is found", async () => {
            const id = "507f1f77bcf86cd799439011";
            const patchData = { email: "patched@example.com" };
            const patchedClient = { _id: id, name: "John Doe", ...patchData };

            ClientRepository.patch = jest.fn().mockResolvedValue(patchedClient);

            const result = await ClientService.patch(id, patchData);

            expect(ClientRepository.patch).toHaveBeenCalledWith(id, patchData);
            expect(result.code).toBe(200);
            expect(result.success).toBe(true);
            expect(result.message).toBe("Client patched successfully");
            expect(result.data).toEqual(patchedClient);
        });

        it("should return 404 when client to patch is not found", async () => {
            ClientRepository.patch = jest.fn().mockResolvedValue(null);

            const result = await ClientService.patch("inexistent-id", {});

            expect(ClientRepository.patch).toHaveBeenCalledWith(
                "inexistent-id",
                {},
            );
            expect(result.code).toBe(404);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Client not found");
            expect(result.data).toBeNull();
        });

        it("should return 500 when repository.patch throws an error", async () => {
            ClientRepository.patch = jest
                .fn()
                .mockRejectedValue(new Error("DB error"));

            const result = await ClientService.patch("some-id", {});

            expect(ClientRepository.patch).toHaveBeenCalledWith("some-id", {});
            expect(result.code).toBe(500);
            expect(result.success).toBe(false);
            expect(result.message).toBe("Internal server error");
            expect(result.data).toBeNull();
        });
    });
});
