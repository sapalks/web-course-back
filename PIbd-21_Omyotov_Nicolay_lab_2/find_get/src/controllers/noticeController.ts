import { NoticeDto } from "./dto/noticeDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ArgumentError } from "../error";
import { logger } from "../logger";
import { NoticeService } from "../service/noticeService";
import { ok } from "./utilsController";

export async function create(request: Request, response: Response) {
  const notice = plainToClass(NoticeDto, request.body);
  const errors = await validate(notice, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError();
  }
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
  if (!request.query.id) {
    throw new ArgumentError("id");
  }
  const id = Number(request.query.id);
  response.json(ok(await NoticeService.delete(id)));
}

export async function get(request: Request, response: Response) {
  if (!request.query.id) {
    throw new ArgumentError("id");
  }
  const id = Number(request.query.id);
  response.json(ok(await NoticeService.get(id)));
}

export async function getAll(request: Request, response: Response) {
  if (!request.query.id) {
    response.json(ok(await NoticeService.getAll()));
    return;
  }
  const ownerId = Number(request.query.ownerId);
  response.json(ok(await NoticeService.getAllByOwnerId(ownerId)));
}

export async function update(request: Request, response: Response) {
  const notice = plainToClass(NoticeDto, request.body);
  const errors = await validate(notice, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError();
  }

  const id = Number(request.query.id);
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
