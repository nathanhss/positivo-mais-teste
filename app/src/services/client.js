import ClientRepository from "../repositories/client.js";
import { createHash } from "node:crypto";
import logger from "../utils/logger.js";

class ClientService {
    constructor() {
        this.hash = createHash("sha256");
    }

    async create(client) {
        try {
            const password = this.hash.digest("hex", client.password, 10);
            const clientCreated = await ClientRepository.create({
                ...client,
                password,
            });
            if (!clientCreated) {
                logger.warn("Client not created");
                return {
                    status: 404,
                    success: false,
                    message: "Client not created",
                    data: null,
                };
            }

            logger.info("Client created successfully", clientCreated);

            return {
                status: 201,
                success: true,
                message: "Client created successfully",
                data: clientCreated,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                data: null,
            };
        }
    }

    async getAll() {
        try {
            const clients = await ClientRepository.getAll();

            logger.info("Clients found successfully", clients);

            return {
                status: 200,
                success: true,
                message: "Clients found successfully",
                data: clients,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                data: null,
            };
        }
    }

    async getById(id) {
        try {
            const client = await ClientRepository.getById(id);

            if (!client) {
                logger.warn("Client not found");
                return {
                    status: 404,
                    success: false,
                    message: "Client not found",
                    data: null,
                };
            }

            return {
                status: 200,
                success: true,
                message: "Client found successfully",
                data: client,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                data: null,
            };
        }
    }

    async update(id, client) {
        try {
            if (client.password) {
                client.password = this.hash.digest("hex", client.password, 10);
            }

            const clientUpdated = await ClientRepository.update(id, client);
            if (!clientUpdated) {
                logger.warn("Client not found");
                return {
                    status: 404,
                    success: false,
                    message: "Client not found",
                    data: null,
                };
            }

            return {
                status: 200,
                success: true,
                message: "Client updated successfully",
                data: clientUpdated,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                data: null,
            };
        }
    }

    async delete(id) {
        try {
            const clientDeleted = await ClientRepository.delete(id);
            if (!clientDeleted) {
                logger.warn("Client not found");
                return {
                    status: 404,
                    success: false,
                    message: "Client not deleted",
                    data: null,
                };
            }

            return {
                status: 200,
                success: true,
                message: "Client deleted successfully",
                data: clientDeleted,
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: "Internal server error",
                data: null,
            };
        }
    }
}

export default new ClientService();
