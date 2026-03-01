import ClientService from "../services/client.js";
import logger from "../utils/logger.js";

class ClientController {
    async create(data) {
        try {
            const { name, email, document, username, password } = data;
            return await ClientService.create({
                name,
                email,
                document,
                username,
                password,
            });
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getAll() {
        try {
            return await ClientService.getAll();
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            return await ClientService.getById(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await ClientService.update(id, data);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async delete(id) {
        try {
            return await ClientService.delete(id);
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    // async patchStatus(id, data) {
    //   return await ClientService.patchStatus(id, data);
    // }
}

export default new ClientController();
