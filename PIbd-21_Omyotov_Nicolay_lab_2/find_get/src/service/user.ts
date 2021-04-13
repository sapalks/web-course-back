import { getManager } from "typeorm";
import { User } from "../entity";
import { NotFoundError } from "../error";
import { catchOrmErrors } from "./utils";


export class UserService {
    public static async add(name: string, phoneNumber: string, city: string): Promise<User> {
        const rep = getManager().getRepository(User);
        return catchOrmErrors(async () => {
            return await rep.save({ name, phoneNumber, city, rate: 0, joinDate: Date(), numReviews: 0, numSubscribtions: 0, numSubscribers: 0});
        });
    }

    public static async edit(id: number, data: { name?: string, rate?: number, numReviews?: number, numSubscribtions?: number, numSubscribers?: number, phoneNumber?: string, city?: string }): Promise<User> {
        const rep = getManager().getRepository(User);
        let user = await rep.findOne(id);
        if (!user) throw new NotFoundError('user');
        const { name, rate, numReviews, numSubscribtions, numSubscribers, phoneNumber, city } = data;
        user = {
            ...user,
            ...name && { name },
            ...rate && { rate },
            ...numReviews && { numReviews },
            ...numSubscribtions && { numSubscribtions },
            ...numSubscribers && { numSubscribers },
            ...phoneNumber && { phoneNumber },
            ...city && { city },
        }
        return await rep.save(user);
    }

    public static async get(...ids: number[]): Promise<User[]> {
        const rep = getManager().getRepository(User);
        if (ids.length === 0)
            return await rep.find({ take: 10 });
        return await rep.findByIds(ids, { take: 10 });
    }

    public static async getPureSql(...ids: number[]): Promise<User[]> {
        const rep = getManager().getRepository(User);
        if (ids.length === 0)
            return await rep.query('select * from User')
        return await rep.query('select * from User where 1=0 or ' + ids.map(id => `"id"='${id}'`).join(' or '))
    }
}