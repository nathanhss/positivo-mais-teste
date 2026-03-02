jest.mock("../../models/clients.js");
jest.mock("../../utils/logger.js", () => ({
    __esModule: true,
    default: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

import Client from "../../models/clients.js";
import ClientRepository from "../../repositories/client.js";

describe("ClientRepository", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should call Client.create with client data and return result", async () => {
            const clientData = { name: "John", email: "john@example.com" };
            const created = { _id: "1", ...clientData };
            Client.create.mockResolvedValue(created);

            const result = await ClientRepository.create(clientData);

            expect(Client.create).toHaveBeenCalledWith(clientData);
            expect(result).toEqual(created);
        });

        it("should throw when Client.create fails", async () => {
            Client.create.mockRejectedValue(new Error("DB error"));

            await expect(ClientRepository.create({})).rejects.toThrow();
        });
    });

    describe("getAll", () => {
        it("should call Client.find and return list", async () => {
            const clients = [{ _id: "1", name: "John" }];
            Client.find.mockResolvedValue(clients);

            const result = await ClientRepository.getAll();

            expect(Client.find).toHaveBeenCalledWith();
            expect(result).toEqual(clients);
        });

        it("should throw when Client.find fails", async () => {
            Client.find.mockRejectedValue(new Error("DB error"));

            await expect(ClientRepository.getAll()).rejects.toThrow();
        });
    });

    describe("getById", () => {
        it("should call Client.findById and return client", async () => {
            const id = "507f1f77bcf86cd799439011";
            const client = { _id: id, name: "John" };
            Client.findById.mockResolvedValue(client);

            const result = await ClientRepository.getById(id);

            expect(Client.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(client);
        });

        it("should throw when Client.findById fails", async () => {
            Client.findById.mockRejectedValue(new Error("DB error"));

            await expect(ClientRepository.getById("id")).rejects.toThrow();
        });
    });

    describe("update", () => {
        it("should call Client.findByIdAndUpdate and return updated client", async () => {
            const id = "507f1f77bcf86cd799439011";
            const payload = { name: "Jane" };
            const updated = { _id: id, ...payload };
            Client.findByIdAndUpdate.mockResolvedValue(updated);

            const result = await ClientRepository.update(id, payload);

            expect(Client.findByIdAndUpdate).toHaveBeenCalledWith(id, payload, {
                new: true,
            });
            expect(result).toEqual(updated);
        });

        it("should throw when Client.findByIdAndUpdate fails", async () => {
            Client.findByIdAndUpdate.mockRejectedValue(new Error("DB error"));

            await expect(ClientRepository.update("id", {})).rejects.toThrow();
        });
    });

    describe("delete", () => {
        it("should call Client.findByIdAndDelete and return deleted client", async () => {
            const id = "507f1f77bcf86cd799439011";
            const deleted = { _id: id, name: "John" };
            Client.findByIdAndDelete.mockResolvedValue(deleted);

            const result = await ClientRepository.delete(id);

            expect(Client.findByIdAndDelete).toHaveBeenCalledWith(id);
            expect(result).toEqual(deleted);
        });

        it("should throw when Client.findByIdAndDelete fails", async () => {
            Client.findByIdAndDelete.mockRejectedValue(new Error("DB error"));

            await expect(ClientRepository.delete("id")).rejects.toThrow();
        });
    });
});
