import { allNoticesKey, noticeKey } from "./../service/cacheService";
import { NoticeDto } from "./dto/noticeDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ArgumentError } from "../error";
import { logger } from "../logger";
import { NoticeService } from "../service/noticeService";
import { ok } from "./utilsController";
import { Cache } from "../service/cacheService";
const cache: Cache = new Cache();

export async function create(request: Request, response: Response) {
  const notice = plainToClass(NoticeDto, request.body);
  const errors = await validate(notice, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError();
  }
  cache.delete(allNoticesKey);
  response.json(
    ok(
      await NoticeService.add(
        notice.purchaseName,
        notice.price,
        notice.safeDeal,
        notice.deliveryPossibility,
        notice.ownerId,
        notice.description,
        notice.photoUrl
      )
    )
  );
}

export async function remove(request: Request, response: Response) {
  if (!request.body.id) {
    throw new ArgumentError("id");
  }
  const id = Number(request.body.id);
  cache.delete(allNoticesKey);
  cache.delete(`${noticeKey}${id}`);
  response.json(ok(await NoticeService.delete(id)));
}

export async function get(request: Request, response: Response) {
  if (!request.query.id) {
    throw new ArgumentError("id");
  }
  logger.info(request.query);
  const id = Number(request.query.id);
  const key = `${noticeKey}${id}`;
  const result = await cache.read(key);
  if (result) {
    response.json(ok(result));
    return;
  }
  const data = await NoticeService.get(id);
  cache.save(key, data);
  response.json(ok(data));
}

export async function getAll(request: Request, response: Response) {
  if (!request.query.id) {
    const result = await cache.read(allNoticesKey);
    if (result) {
      response.json(ok(result));
      return;
    }
    const data = await NoticeService.getAll();
    cache.save(allNoticesKey, data);
    response.json(ok(data));
    response.json(ok(data));
    return;
  }
  const ownerId = Number(request.query.id);
  response.json(ok(await NoticeService.getAllByOwnerId(ownerId)));
}

export async function update(request: Request, response: Response) {
  if (!request.body.id) {
    throw new ArgumentError("id");
  }
  const notice = plainToClass(NoticeDto, request.body);
  const id = Number(request.body.id);
  cache.delete(`${noticeKey}${id}`);
  cache.delete(allNoticesKey);
  response.json(
    ok(
      await NoticeService.update(id, {
        purchaseName: notice.purchaseName,
        price: notice.price,
        safeDeal: notice.safeDeal,
        deliveryPossibility: notice.deliveryPossibility,
        ownerId: notice.ownerId,
        description: notice.description,
        photoUrl: notice.photoUrl,
      })
    )
  );
}

export async function lastWasCached(request: Request, response: Response) {
  response.json(ok({ cached: cache.isCached() }));
}
