import winston from "winston";

class Logger {
    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: winston.format.json(),
            defaultMeta: { service: "client-service" },
            timestamp: true,
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: "logs/error.log",
                    level: "error",
                }),
                new winston.transports.File({
                    filename: "logs/info.log",
                    level: "info",
                }),
            ],
        });
    }

    info(message, details = null) {
        this.logger.info({
            message,
            timestamp: new Date().toISOString(),
            details,
        });
    }

    error(message, details = null) {
        this.logger.error({
            message,
            timestamp: new Date().toISOString(),
            details,
        });
    }

    warn(message, details = null) {
        this.logger.warn({
            message,
            timestamp: new Date().toISOString(),
            details,
        });
    }
}

export default new Logger();
