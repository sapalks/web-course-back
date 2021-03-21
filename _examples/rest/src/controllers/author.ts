import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { AuthorDto } from "./dto";
import { ArgumentError } from "../error";
import { logger } from "../logger";
import { AuthorService } from "../service/author";
import { ok } from "./utils";

export async function create(request: Request, response: Response) {
    const user = plainToClass(AuthorDto, request.body);
    const errors = await validate(user, { skipMissingProperties: true });
    if (errors.length) {
        logger.info(JSON.stringify(errors, null, '  '));
        throw new ArgumentError();
    }
    response.json(ok(await AuthorService.add(user.name, user.born, user.died)));
}

export async function get(request: Request, response: Response) {
    if (!request.query.id) {
        response.json(ok(await AuthorService.get()))
        return;
    }
    const id = request.query.id as string
    response.json(ok(await AuthorService.get(id)));
}


export async function getPureSql(request: Request, response: Response) {
    if (!request.query.id) {
        response.json(ok(await AuthorService.getPureSql()))
        return;
    }
    const id = request.query.id as string
    response.json(ok(await AuthorService.getPureSql(id)));
}