import { UserService } from "./service/userService";
import onFinished from "on-finished";
import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";
import {
  AlreadyExistsError,
  ArgumentError,
  NotFoundError,
  ProtocolError,
} from "./error";
import { error } from "./controllers/utilsController";

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret-key",
};

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

export function accessCheck(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  module.exports = (data: any) => {
    data.use(
      new JwtStrategy(
        options,
        async (
          payload: { clientId: number },
          done: (arg0: null, arg1: boolean) => void
        ) => {
          try {
            const user = (await UserService.get(payload.clientId))[0];
            if (user) {
              done(null, true);
            } else {
              done(null, false);
            }
          } catch (e) {
            console.log(e);
          }
        }
      )
    );
  };
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
    if (exception instanceof AlreadyExistsError) {
      status = 401;
    }
    if (exception instanceof NotFoundError) {
      status = 404;
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
