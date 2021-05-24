import { NoticeDto } from "./dto/noticeDTO";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { ArgumentError } from "../error";
import { logger } from "../logger";
import { NoticeService } from "../service/noticeService";
import { ok } from "./utilsController";
import { checkJWT } from "./userController";

export async function create(request: Request, response: Response) {
  const user = await checkJWT(request);
  const notice = plainToClass(NoticeDto, request.body);

  const errors = await validate(notice, { skipMissingProperties: true });
  if (errors.length) {
    logger.info(JSON.stringify(errors, null, "  "));
    throw new ArgumentError();
  }
  await NoticeService.add(
    notice.purchaseName,
    notice.subCategoryId,
    notice.price,
    notice.safeDeal,
    notice.deliveryPossibility,
    user.id,
    notice.description,
    notice.photoUrl
  );
  response.json(ok());
}

export async function remove(request: Request, response: Response) {
  await checkJWT(request);
  if (!request.query.id) {
    throw new ArgumentError("id");
  }
  const id = Number(request.query.id);
  await NoticeService.delete(id);
  response.json(ok());
}

export async function get(request: Request, response: Response) {
  await checkJWT(request);
  if (!request.query.id) {
    throw new ArgumentError("id");
  }
  logger.info(request.query);
  const id = Number(request.query.id);
  response.json(ok(await NoticeService.get(id)));
}

export async function getAllBySubCategory(
  request: Request,
  response: Response
) {
  await checkJWT(request);
  if (!request.query.id) {
    throw new ArgumentError("id");
  }
  const subCategoryId = Number(request.query.id);
  response.json(ok(await NoticeService.getAllBySubCategory(subCategoryId)));
}

export async function getAll(request: Request, response: Response) {
  if (!request.query.id) {
    response.json(ok(await NoticeService.getAll()));
    return;
  }
  await checkJWT(request);
  const ownerId = Number(request.query.id);
  response.json(ok(await NoticeService.getAllByOwnerId(ownerId)));
}

export async function update(request: Request, response: Response) {
  console.log(request);
  await checkJWT(request);
  if (!request.body.id) {
    throw new ArgumentError("id");
  }
  const notice = plainToClass(NoticeDto, request.body);
  const id = Number(request.body.id);
  await NoticeService.update(id, {
    purchaseName: notice.purchaseName,
    price: notice.price,
    safeDeal: notice.safeDeal,
    deliveryPossibility: notice.deliveryPossibility,
    ownerId: notice.ownerId,
    description: notice.description,
    photoUrl: notice.photoUrl,
  });
  response.json(ok());
}
