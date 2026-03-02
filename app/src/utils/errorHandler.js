export const errorHandler = (code, message, success = true, data = null) => {
    return { code, message, success, data };
};
