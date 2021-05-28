import { User } from "./../entity/user";
import { UnauthorizedError } from "./../error";
import { UserDto } from "./dto/userDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { AlreadyExistsError, ArgumentError, NotFoundError } from "../error";
import { logger } from "../logger";
import { UserService } from "../service/userService";
import { ok } from "./utilsController";
import * as jwt from "jsonwebtoken";

export async function create(request: Request, response: Response) {
  logger.info(JSON.stringify(request.body));
  const user = plainToClass(UserDto, request.body);
  const errors = await validate(user, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError(errors.toString());
  }
  response.json(
    ok(
      await UserService.add(
        user.name,
        user.phoneNumber,
        user.city,
        user.password
      )
    )
  );
}

export async function register(request: Request, response: Response) {
  logger.info(JSON.stringify(request.body));
  const user = plainToClass(UserDto, request.body);
  const errors = await validate(user, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError(errors.toString());
  }
  if (await UserService.exists(user.phoneNumber)) {
    throw new AlreadyExistsError();
  }
  await UserService.add(user.name, user.phoneNumber, user.city, user.password);
  response.json(ok());
}

export async function login(request: Request, response: Response) {
  logger.info(JSON.stringify(request.body));
  const { login, password } = request.body;
  if (!login) {
    throw new ArgumentError("login");
  }
  if (!password) {
    throw new ArgumentError("password");
  }
  if (!(await UserService.exists(login))) {
    throw new NotFoundError();
  }
  if (!(await UserService.checkPassword(login, password))) {
    throw new UnauthorizedError();
  }

  response.json(ok({ ...(await UserService.getToken(login)) }));
}

export async function checkJWT(request: Request): Promise<User> {
  const token = request.header("token");
  if (token) {
    try {
      const result = jwt.decode(token);
      if (result instanceof Object) {
        const user = (await UserService.get((result.userId as number) ?? 0))[0];
        if (!user) {
          throw new Error();
        } else {
          return user;
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error.stack);
      throw new UnauthorizedError();
    }
  } else {
    throw new UnauthorizedError();
  }
}

export async function remove(request: Request, response: Response) {
  if (!request.body.id) {
    throw new ArgumentError("id");
  }
  const id = Number(request.body.id);
  response.json(ok(await UserService.delete(id)));
}

export async function get(request: Request, response: Response) {
  if (!request.query.id) {
    response.json(ok(await UserService.getAll()));
    return;
  }
  const id = Number(request.query.id);
  response.json(ok(await UserService.get(id)));
}

export async function update(request: Request, response: Response) {
  const userOld = await checkJWT(request);
  const user = plainToClass(UserDto, request.body);
  response.json(
    ok(
      await UserService.update(userOld.id, {
        name: user.name,
        phoneNumber: user.phoneNumber,
        city: user.city,
        rate: user.rate,
        numReviews: user.numReviews,
        numSubscribtions: user.numSubscribtions,
        numSubscribers: user.numSubscribers,
      })
    )
  );
}
