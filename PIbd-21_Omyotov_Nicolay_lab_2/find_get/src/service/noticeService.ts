import { getManager } from "typeorm";
import { Notice } from "../entity";
import { NotFoundError } from "../error";
import { catchOrmErrors } from "./utilsService";

export class NoticeService {
  public static async add(
    purchaseName: string,
    price: number,
    safeDeal: boolean,
    deliveryPossibility: boolean,
    ownerId?: number,
    description?: string,
    photoUrl?: string
  ): Promise<Notice> {
    const rep = getManager().getRepository(Notice);
    return catchOrmErrors(async () => {
      return await rep.save({
        purchaseName: purchaseName,
        ownerId: ownerId,
        description: description,
        price: price,
        photoUrl: photoUrl,
        safeDeal: safeDeal,
        deliveryPossibility: deliveryPossibility,
        postDate: Date(),
      });
    });
  }

  public static async update(
    id: number,
    data: {
      purchaseName?: string;
      price?: number;
      safeDeal?: boolean;
      deliveryPossibility?: boolean;
      ownerId?: number;
      description?: string;
      photoUrl?: string;
    }
  ): Promise<Notice> {
    const rep = getManager().getRepository(Notice);
    let notice = await rep.findOne(id);
    if (!notice) throw new NotFoundError("notice");
    const {
      purchaseName,
      price,
      safeDeal,
      deliveryPossibility,
      ownerId,
      description,
      photoUrl,
    } = data;
    notice = {
      ...notice,
      ...(purchaseName && { purchaseName }),
      ...(price && { price }),
      ...(safeDeal && { safeDeal }),
      ...(deliveryPossibility && { deliveryPossibility }),
      ...(ownerId && { ownerId }),
      ...(description && { description }),
      ...(photoUrl && { photoUrl }),
    };
    return await rep.save(notice);
  }

  public static async get(...ids: number[]): Promise<Notice[]> {
    const rep = getManager().getRepository(Notice);
    return await rep.findByIds(ids, { take: 10 });
  }

  public static async getAll(): Promise<Notice[]> {
    const rep = getManager().getRepository(Notice);
    return await rep.query("select * from notice");
  }

  public static async getAllByOwnerId(id: number): Promise<Notice[]> {
    const rep = getManager().getRepository(Notice);
    return await rep.query(`select * from notice where id=${id}`);
  }

  public static async delete(id: number): Promise<Notice> {
    const rep = getManager().getRepository(Notice);
    let notice = await rep.findOne(id);
    if (!notice) throw new NotFoundError("notice");
    return await rep.remove(notice);
  }
}
