import { Expose } from "class-transformer";
import { IsDefined, Matches, IsOptional } from "class-validator";

export class AuthorDto {

    @IsDefined()
    @Expose()
    name: string;

    @IsDefined()
    @Expose()
    born: number;

    @IsOptional()
    @Expose()
    died: number;
}