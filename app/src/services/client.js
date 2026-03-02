import ClientRepository from "../repositories/client.js";
import { createHash } from "node:crypto";
import { errorHandler } from "../utils/errorHandler.js";
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
                return errorHandler(404, "Client not created", false, null);
            }

            logger.info("Client created successfully", clientCreated);

            return errorHandler(
                201,
                "Client created successfully",
                true,
                clientCreated,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error", false, null);
        }
    }

    async getAll() {
        try {
            const clients = await ClientRepository.getAll();

            logger.info("Clients found successfully", clients);

            return errorHandler(
                200,
                "Clients found successfully",
                true,
                clients,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error", false, null);
        }
    }

    async getById(id) {
        try {
            const client = await ClientRepository.getById(id);

            if (!client) {
                logger.warn("Client not found");
                return errorHandler(404, "Client not found", false, null);
            }

            return errorHandler(200, "Client found successfully", true, client);
        } catch (error) {
            return errorHandler(500, "Internal server error", false, null);
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
                return errorHandler(404, "Client not found", false, null);
            }

            return errorHandler(
                200,
                "Client updated successfully",
                true,
                clientUpdated,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error", false, null);
        }
    }

    async delete(id) {
        try {
            const clientDeleted = await ClientRepository.delete(id);
            if (!clientDeleted) {
                logger.warn("Client not found");
                return errorHandler(404, "Client not deleted", false, null);
            }

            return errorHandler(
                200,
                "Client deleted successfully",
                true,
                clientDeleted,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error", false, null);
        }
    }
}

export default new ClientService();
