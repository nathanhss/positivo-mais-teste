import ClientService from "../services/client.js";
import logger from "../utils/logger.js";

class ClientController {
    async create(data) {
        try {
            return await ClientService.create(data);
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            return await ClientService.getAll();
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            return await ClientService.getById(id);
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await ClientService.update(id, data);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            return await ClientService.delete(id);
        } catch (error) {
            throw error;
        }
    }

    async patch(id, data) {
        try {
            return await ClientService.patch(id, data);
        } catch (error) {
            throw error;
        }
    }
}

export default new ClientController();
