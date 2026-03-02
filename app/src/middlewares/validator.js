import {
    createClientValidator,
    deleteClientValidator,
    getClientValidator,
    patchClientValidator,
    updateClientValidator,
} from "../validators/clients.js";

export const validate = (method) => {
    switch (method) {
        case "create":
            return createClientValidator;
        case "get":
            return getClientValidator;
        case "update":
            return updateClientValidator;
        case "delete":
            return deleteClientValidator;
        case "patch":
            return patchClientValidator;
    }
};
