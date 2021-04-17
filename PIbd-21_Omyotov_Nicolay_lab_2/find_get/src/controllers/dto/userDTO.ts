import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";

export class UserDto {

    @IsDefined()
    @Expose()
    name: string;

    @IsDefined()
    @Expose()
    rate: number;

    @IsDefined()
    @Expose()
    joinDate: Date;

    @IsDefined()
    @Expose()
    numReviews: number;

    @IsDefined()
    @Expose()
    numSubscribtions: number;

    @IsDefined()
    @Expose()
    numSubscribers: number;

    @IsDefined()
    @Expose()
    phoneNumber: string;

    @IsDefined()
    @Expose()
    city: string;
}