import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request } from "express";
import { createConnection } from "typeorm";
import { config } from '../entity';
import { ResponseDto } from "./dto";

export async function toDto<T>(request: Request, type: ClassConstructor<T>): Promise<T> {
    const user = plainToClass(type, request.body);
    const errors = await validate(user as unknown as object, { skipMissingProperties: true });
    if (errors.length)
        throw new Error()
    return user;

}

export async function makeFreshDatabase() {
    const opts = { ...config }

    opts.synchronize = true;
    opts.dropSchema = true;
    opts.name = 'test-cleaner';

    const connection = await createConnection(opts);
    await connection.close();
}

export function ok(data?: any): ResponseDto {
    return {
        status: 'ok',
        ...data && { data }
    }
}

export function error(data?: any): ResponseDto {
    return {
        status: 'error',
        ...data && { data }
    }
}