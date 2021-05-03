import { getManager } from "typeorm";
import { User, Password } from "../entity";
import { NotFoundError } from "../error";
import { catchOrmErrors } from "./utilsService";
import jwt from "jsonwebtoken";

export class UserService {
  public static async add(
    name: string,
    phoneNumber: string,
    city: string,
    password: string
  ): Promise<User> {
    const repUser = getManager().getRepository(User);
    const repPass = getManager().getRepository(Password);
    return catchOrmErrors(async () => {
      let user = await repUser.save({
        name,
        phoneNumber,
        city,
        rate: 0,
        joinDate: Date(),
        numReviews: 0,
        numSubscribtions: 0,
        numSubscribers: 0,
      });
      repPass.save({
        password,
        userId: user.id,
      });
      return user;
    });
  }

  public static async update(
    id: number,
    data: {
      name?: string;
      rate?: number;
      numReviews?: number;
      numSubscribtions?: number;
      numSubscribers?: number;
      phoneNumber?: string;
      city?: string;
    }
  ): Promise<User> {
    const rep = getManager().getRepository(User);
    let user = await rep.findOne(id);
    if (!user) throw new NotFoundError("user");
    const {
      name,
      rate,
      numReviews,
      numSubscribtions,
      numSubscribers,
      phoneNumber,
      city,
    } = data;
    user = {
      ...user,
      ...(name && { name }),
      ...(rate && { rate }),
      ...(numReviews && { numReviews }),
      ...(numSubscribtions && { numSubscribtions }),
      ...(numSubscribers && { numSubscribers }),
      ...(phoneNumber && { phoneNumber }),
      ...(city && { city }),
    };
    return await rep.save(user);
  }

  public static async get(...ids: number[]): Promise<User[]> {
    const rep = getManager().getRepository(User);
    return await rep.findByIds(ids, { take: 10 });
  }

  public static async getAll(): Promise<User[]> {
    const rep = getManager().getRepository(User);
    return await rep.query("select * from public.user");
  }

  public static async delete(id: number): Promise<User> {
    const rep = getManager().getRepository(User);
    let user = await rep.findOne(id);
    if (!user) throw new NotFoundError("user");
    return await rep.remove(user);
  }

  public static async exists(phoneNumber: string): Promise<boolean> {
    const rep = getManager().getRepository(User);
    let user = await rep.findOne({ where: { phoneNumber } });
    return !!user;
  }

  public static async getToken(login: string, userId: Number): Promise<string> {
    return jwt.sign(
      {
        login: login,
        clientId: userId,
      },
      "secret-key",
      { expiresIn: 604800 }
    );
  }
}
