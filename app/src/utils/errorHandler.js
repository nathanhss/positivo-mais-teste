export const errorHandler = (code, message, success = false, data = null) => {
    return { code, message, success, data };
};
