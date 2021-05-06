import { createLogger, format, Logger, transports } from "winston";

export function create(): Logger {
    const options = {
        level: 'info',
        format: format.simple(),
    };
    const logger = createLogger({
        transports: [
            new transports.Console(options)
        ],
        exitOnError: false
    });
    return logger;
}

const _default = create();

export { _default as logger };