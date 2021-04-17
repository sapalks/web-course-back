import { Expose } from "class-transformer";
import { IsDefined, IsOptional } from "class-validator";

export class NoticeDto {
  @IsDefined()
  @Expose()
  purchaseName: string;

  @IsOptional()
  @Expose()
  ownerId: number;

  @IsOptional()
  @Expose()
  description?: string;

  @IsDefined()
  @Expose()
  price: number;

  @IsOptional()
  @Expose()
  photoUrl?: string;

  @IsDefined()
  @Expose()
  safeDeal: boolean;

  @IsDefined()
  @Expose()
  deliveryPossibility: boolean;

  @IsDefined()
  @Expose()
  postDate: Date;
}
