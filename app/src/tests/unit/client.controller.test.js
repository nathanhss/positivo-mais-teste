jest.mock("../../services/client.js");

import ClientController from "../../controllers/client.js";
import ClientService from "../../services/client.js";

describe("ClientController", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should call ClientService.create with extracted data and return result", async () => {
            const data = {
                name: "John Doe",
                email: "john@example.com",
                document: "1234567890",
                username: "john.doe",
                password: "123456",
            };
            const serviceResponse = { status: 201, success: true, message: "Client created successfully", data: {} };
            ClientService.create.mockResolvedValue(serviceResponse);

            const result = await ClientController.create(data);

            expect(ClientService.create).toHaveBeenCalledWith({
                name: data.name,
                email: data.email,
                document: data.document,
                username: data.username,
                password: data.password,
            });
            expect(result).toEqual(serviceResponse);
        });

        it("should throw when ClientService.create throws", async () => {
            ClientService.create.mockRejectedValue(new Error("Service error"));

            await expect(ClientController.create({})).rejects.toThrow("Service error");
        });
    });

    describe("getAll", () => {
        it("should call ClientService.getAll and return result", async () => {
            const serviceResponse = { status: 200, success: true, data: [] };
            ClientService.getAll.mockResolvedValue(serviceResponse);

            const result = await ClientController.getAll();

            expect(ClientService.getAll).toHaveBeenCalled();
            expect(result).toEqual(serviceResponse);
        });

        it("should throw when ClientService.getAll throws", async () => {
            ClientService.getAll.mockRejectedValue(new Error("Service error"));

            await expect(ClientController.getAll()).rejects.toThrow("Service error");
        });
    });

    describe("getById", () => {
        it("should call ClientService.getById with id and return result", async () => {
            const id = "507f1f77bcf86cd799439011";
            const serviceResponse = { status: 200, success: true, data: { _id: id, name: "John" } };
            ClientService.getById.mockResolvedValue(serviceResponse);

            const result = await ClientController.getById(id);

            expect(ClientService.getById).toHaveBeenCalledWith(id);
            expect(result).toEqual(serviceResponse);
        });

        it("should throw when ClientService.getById throws", async () => {
            ClientService.getById.mockRejectedValue(new Error("Service error"));

            await expect(ClientController.getById("some-id")).rejects.toThrow("Service error");
        });
    });

    describe("update", () => {
        it("should call ClientService.update with id and data and return result", async () => {
            const id = "507f1f77bcf86cd799439011";
            const data = { name: "Jane Doe", email: "jane@example.com" };
            const serviceResponse = { status: 200, success: true, message: "Client updated successfully", data: {} };
            ClientService.update.mockResolvedValue(serviceResponse);

            const result = await ClientController.update(id, data);

            expect(ClientService.update).toHaveBeenCalledWith(id, data);
            expect(result).toEqual(serviceResponse);
        });

        it("should throw when ClientService.update throws", async () => {
            ClientService.update.mockRejectedValue(new Error("Service error"));

            await expect(ClientController.update("id", {})).rejects.toThrow("Service error");
        });
    });

    describe("delete", () => {
        it("should call ClientService.delete with id and return result", async () => {
            const id = "507f1f77bcf86cd799439011";
            const serviceResponse = { status: 200, success: true, message: "Client deleted successfully", data: {} };
            ClientService.delete.mockResolvedValue(serviceResponse);

            const result = await ClientController.delete(id);

            expect(ClientService.delete).toHaveBeenCalledWith(id);
            expect(result).toEqual(serviceResponse);
        });

        it("should throw when ClientService.delete throws", async () => {
            ClientService.delete.mockRejectedValue(new Error("Service error"));

            await expect(ClientController.delete("id")).rejects.toThrow("Service error");
        });
    });
});
