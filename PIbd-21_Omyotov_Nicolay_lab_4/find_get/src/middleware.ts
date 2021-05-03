import onFinished from "on-finished";
import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";
import {
  AlreadyExistsError,
  ArgumentError,
  NotFoundError,
  ProtocolError,
  UnauthorizedError,
} from "./error";
import { error } from "./controllers/utilsController";

function commit(request: Request, response: Response): void {
  const started = (request as any)._state.started;
  const reqInfo = `${request.method} ${request.originalUrl}`;
  const duration = Date.now() - started.getTime();
  const msg = `[${started.toUTCString()}, ${duration}ms] ${reqInfo}, ${
    response.statusCode
  }`;
  logger.info(msg);
}

export function accessLog(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  (request as any)._state = { started: new Date() };
  onFinished(response, (error, res) => {
    if (!error) {
      commit(request, response);
    }
  });
  next();
}

export function errorRequestHandler(
  exception: Error,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  let message = exception.message;
  let status = 500;
  if (exception instanceof ProtocolError) {
    if (exception instanceof UnauthorizedError) {
      status = 401;
    }
    if (exception instanceof NotFoundError) {
      status = 404;
    }
    if (exception instanceof AlreadyExistsError) {
      status = 409;
    }
    if (exception instanceof ArgumentError) {
      status = 422;
    }
  } else {
    if (exception.stack) {
      logger.error(exception.stack.toString());
    } else {
      logger.error(exception.toString());
    }
  }
  response.status(status);
  response.json(error(message));
}
