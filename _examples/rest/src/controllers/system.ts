import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { AuthorDto } from "./dto";
import { ArgumentError } from "../error";
import { logger } from "../logger";
import { AuthorService } from "../service/author";
import { makeFreshDatabase, ok } from "./utils";

export async function ping(request: Request, response: Response) {
    response.json(ok(new Date().toUTCString()));
}

export async function clearDb(request: Request, response: Response) {
    await makeFreshDatabase();
    response.json(ok());
}
