import { userKey } from "./../service/cacheService";
import { UserDto } from "./dto/userDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ArgumentError } from "../error";
import { logger } from "../logger";
import { UserService } from "../service/userService";
import { ok } from "./utilsController";
import { allUsersKey, Cache } from "../service/cacheService";
const cache: Cache = new Cache();

export async function create(request: Request, response: Response) {
  logger.info(JSON.stringify(request.body));
  const user = plainToClass(UserDto, request.body);
  const errors = await validate(user, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError(errors.toString());
  }
  cache.delete(allUsersKey);
  response.json(
    ok(await UserService.add(user.name, user.phoneNumber, user.city))
  );
}

export async function remove(request: Request, response: Response) {
  if (!request.body.id) {
    throw new ArgumentError("id");
  }
  const id = Number(request.body.id);
  cache.delete(allUsersKey);
  cache.delete(`${userKey}${id}`);
  response.json(ok(await UserService.delete(id)));
}

export async function get(request: Request, response: Response) {
  if (!request.query.id) {
    const result = await cache.read(allUsersKey);
    console.log("result", result);
    if (result) {
      response.json(ok(result));
      return;
    }
    const data = await UserService.getAll();
    cache.save(allUsersKey, data);
    response.json(ok(data));
    return;
  }
  const id = Number(request.query.id);
  const key = `${userKey}${id}`;
  const result = await cache.read(key);
  console.log("result", result, "key", key);
  if (result) {
    response.json(ok(result));
    return;
  }
  const data = await UserService.get(id);
  cache.save(key, data);
  response.json(ok(data));
}

export async function update(request: Request, response: Response) {
  if (!request.body.id) {
    response.json(ok(await UserService.getAll()));
    return;
  }
  const user = plainToClass(UserDto, request.body);
  const id = Number(request.body.id);
  cache.delete(`${userKey}${id}`);
  cache.delete(allUsersKey);
  response.json(
    ok(
      await UserService.update(id, {
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

export async function lastWasCached(request: Request, response: Response) {
  response.json(ok({ cached: cache.isCached() }));
}
