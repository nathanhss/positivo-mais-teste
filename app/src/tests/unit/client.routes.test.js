jest.mock("../../controllers/client.js");

import request from "supertest";
import { createApp } from "../../config/express.js";
import clientRoutes from "../../routes/client.js";
import ClientController from "../../controllers/client.js";

const app = createApp();
app.use(clientRoutes);

describe("Client routes", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /clients", () => {
        it("should return 200 and list from controller", async () => {
            const mockResponse = { code: 200, success: true, data: [{ _id: "1", name: "John" }] };
            ClientController.getAll.mockResolvedValue(mockResponse);

            const res = await request(app).get("/clients");

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockResponse);
            expect(ClientController.getAll).toHaveBeenCalled();
        });
    });

    describe("POST /clients", () => {
        const validBody = {
            name: "John Doe",
            email: "john@example.com",
            document: "1234567890",
            username: "john.doe",
            password: "123456",
        };

        it("should return 201 and created client when body is valid", async () => {
            const mockResponse = { code: 201, success: true, message: "Client created successfully", data: {} };
            ClientController.create.mockResolvedValue(mockResponse);

            const res = await request(app).post("/clients").send(validBody);

            expect(res.status).toBe(201);
            expect(res.body).toEqual(mockResponse);
            expect(ClientController.create).toHaveBeenCalledWith(validBody);
        });

        it("should return 400 when validation fails (missing required fields)", async () => {
            const res = await request(app).post("/clients").send({});

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("errors");
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(ClientController.create).not.toHaveBeenCalled();
        });

        it("should return 500 when controller throws", async () => {
            ClientController.create.mockRejectedValue(new Error("DB error"));

            const res = await request(app).post("/clients").send(validBody);

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty("message");
            expect(ClientController.create).toHaveBeenCalled();
        });
    });

    describe("GET /clients/:id", () => {
        it("should return 200 and client when id is valid", async () => {
            const id = "507f1f77bcf86cd799439011";
            const mockResponse = { code: 200, success: true, data: { _id: id, name: "John" } };
            ClientController.getById.mockResolvedValue(mockResponse);

            const res = await request(app).get(`/clients/${id}`);

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockResponse);
            expect(ClientController.getById).toHaveBeenCalledWith(id);
        });

        it("should return 400 when id is not a valid MongoId (validation)", async () => {
            const res = await request(app).get("/clients/not-a-valid-mongo-id");

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("errors");
            expect(Array.isArray(res.body.errors)).toBe(true);
            expect(ClientController.getById).not.toHaveBeenCalled();
        });

        it("should return 500 when controller throws", async () => {
            ClientController.getById.mockRejectedValue(new Error("Not found"));

            const res = await request(app).get("/clients/507f1f77bcf86cd799439011");

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("PUT /clients/:id", () => {
        const id = "507f1f77bcf86cd799439011";
        const body = {
            name: "Jane Doe",
            email: "jane@example.com",
            document: "9876543210",
            username: "jane.doe",
        };

        it("should return 200 and updated client when valid", async () => {
            const mockResponse = { code: 200, success: true, message: "Client updated successfully", data: {} };
            ClientController.update.mockResolvedValue(mockResponse);

            const res = await request(app).put(`/clients/${id}`).send(body);

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockResponse);
            expect(ClientController.update).toHaveBeenCalledWith(id, body);
        });

        it("should return 500 when controller throws", async () => {
            ClientController.update.mockRejectedValue(new Error("DB error"));

            const res = await request(app).put(`/clients/${id}`).send(body);

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("DELETE /clients/:id", () => {
        const id = "507f1f77bcf86cd799439011";

        it("should return status from controller and deleted client", async () => {
            const mockResponse = { code: 200, success: true, message: "Client deleted successfully", data: {} };
            ClientController.delete.mockResolvedValue(mockResponse);

            const res = await request(app).delete(`/clients/${id}`);

            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockResponse);
            expect(ClientController.delete).toHaveBeenCalledWith(id);
        });

        it("should return 204 when controller returns not found", async () => {
            ClientController.delete.mockResolvedValue({
                code: 404,
                success: false,
                message: "Client not found",
                data: null,
            });

            const res = await request(app).delete(`/clients/${id}`);

            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
        });

        it("should not call controller when id is missing (404)", async () => {
            const res = await request(app).delete("/clients/");

            expect(res.status).toBe(404);
            expect(ClientController.delete).not.toHaveBeenCalled();
        });

        it("should return 500 when controller throws", async () => {
            ClientController.delete.mockRejectedValue(new Error("DB error"));

            const res = await request(app).delete(`/clients/${id}`);

            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty("message");
        });
    });
});
