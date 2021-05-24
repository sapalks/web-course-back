import { Expose } from "class-transformer";
import { IsDefined, IsOptional } from "class-validator";

export class NoticeDto {
  @IsDefined()
  @Expose()
  purchaseName: string;

  @IsDefined()
  @Expose()
  subCategoryId: number;

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

  @IsOptional()
  @Expose()
  safeDeal: boolean;

  @IsOptional()
  @Expose()
  deliveryPossibility: boolean;
}
