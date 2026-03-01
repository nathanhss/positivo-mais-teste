import Client from "../models/clients.js";
import logger from "../utils/logger.js";

class ClientRepository {
    async create(client) {
        try {
            logger.info("Creating client", client);
            return await Client.create(client);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            logger.info("Getting all clients");
            return await Client.find();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            logger.info("Getting client by id", id);
            return await Client.findById(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async update(id, client) {
        try {
            logger.info("Updating client", id, client);
            return await Client.findByIdAndUpdate(id, client, { new: true });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            logger.info("Deleting client", id);
            return await Client.findByIdAndDelete(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }
}

export default new ClientRepository();
