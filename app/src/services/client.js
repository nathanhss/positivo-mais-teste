import ClientRepository from "../repositories/client.js";
import { createHash } from "node:crypto";
import { errorHandler } from "../utils/errorHandler.js";
import logger from "../utils/logger.js";

class ClientService {
    async create(client) {
        try {
            const password = createHash("sha256")
                .update(client.password)
                .digest("hex");
            const clientCreated = await ClientRepository.create({
                ...client,
                password,
            });
            if (!clientCreated) {
                logger.warn("Client not created");
                return errorHandler(404, "Client not created");
            }

            logger.info("Client created successfully", clientCreated);

            return errorHandler(
                201,
                "Client created successfully",
                true,
                clientCreated,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error");
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
            return errorHandler(500, "Internal server error");
        }
    }

    async getById(id) {
        try {
            const client = await ClientRepository.getById(id);

            if (!client) {
                logger.warn("Client not found");
                return errorHandler(404, "Client not found");
            }

            return errorHandler(200, "Client found successfully", true, client);
        } catch (error) {
            return errorHandler(500, "Internal server error");
        }
    }

    async update(id, client) {
        try {
            if (client.password) {
                client.password = createHash("sha256")
                    .update(client.password)
                    .digest("hex");
            }

            const clientUpdated = await ClientRepository.update(id, client);
            if (!clientUpdated) {
                logger.warn("Client not found");
                return errorHandler(404, "Client not found");
            }

            return errorHandler(
                200,
                "Client updated successfully",
                true,
                clientUpdated,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error");
        }
    }

    async delete(id) {
        try {
            const clientDeleted = await ClientRepository.delete(id);
            if (!clientDeleted) {
                logger.warn("Client not found");
                return errorHandler(404, "Client not deleted");
            }

            return errorHandler(
                200,
                "Client deleted successfully",
                true,
                clientDeleted,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error");
        }
    }

    async patch(id, client) {
        try {
            const clientPatched = await ClientRepository.patch(id, client);
            if (!clientPatched) {
                logger.warn("Client not found");
                return errorHandler(404, "Client not found");
            }
            return errorHandler(
                200,
                "Client patched successfully",
                true,
                clientPatched,
            );
        } catch (error) {
            return errorHandler(500, "Internal server error");
        }
    }
}

export default new ClientService();
