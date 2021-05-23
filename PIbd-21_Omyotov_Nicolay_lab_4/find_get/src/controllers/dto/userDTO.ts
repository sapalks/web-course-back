import { Expose } from "class-transformer";
import { IsDefined, IsOptional } from "class-validator";

export class UserDto {
  @IsDefined()
  @Expose()
  name: string;

  @IsOptional()
  @Expose()
  rate: number;

  @IsOptional()
  @Expose()
  joinDate: Date;

  @IsOptional()
  @Expose()
  numReviews: number;

  @IsOptional()
  @Expose()
  numSubscribtions: number;

  @IsOptional()
  @Expose()
  numSubscribers: number;

  @IsDefined()
  @Expose()
  phoneNumber: string;

  @IsDefined()
  @Expose()
  city: string;

  @IsDefined()
  @Expose()
  password: string;
}
