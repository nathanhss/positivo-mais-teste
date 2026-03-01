import ClientService from "../services/client.js";
import logger from "../utils/logger.js";

class ClientController {
    async create(data) {
        try {
            return await ClientService.create(data);
        } catch (error) {
            return error;
        }
    }

    async getAll() {
        try {
            return await ClientService.getAll();
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            return await ClientService.getById(id);
        } catch (error) {
            return error;
        }
    }

    async update(id, data) {
        try {
            return await ClientService.update(id, data);
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            return await ClientService.delete(id);
        } catch (error) {
            return error;
        }
    }

    // async patchStatus(id, data) {
    //   return await ClientService.patchStatus(id, data);
    // }
}

export default new ClientController();
