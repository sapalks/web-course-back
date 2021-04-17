import { UserDto } from "./dto/userDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ArgumentError } from "../error";
import { logger } from "../logger";
import { UserService } from "../service/userService";
import { ok } from "./utilsController";

export async function create(request: Request, response: Response) {
  const user = plainToClass(UserDto, request.body);
  const errors = await validate(user, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError();
  }
  response.json(
    ok(await UserService.add(user.name, user.phoneNumber, user.city))
  );
}

export async function remove(request: Request, response: Response) {
  if (!request.query.id) {
    throw new ArgumentError("id");
  }
  const id = Number(request.query.id);
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
  const user = plainToClass(UserDto, request.body);
  const errors = await validate(user, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError();
  }

  const id = Number(request.query.id);
  response.json(
    ok(
      await UserService.update(id, {
        name: user.name,
        phoneNumber: user.phoneNumber,
        city: user.city,
      })
    )
  );
}
