import { NoticeSubCategory } from "./../entity/noticeSubCategory";
import { Notice } from "./../entity/notice";
import { getManager } from "typeorm";
import { Notice as NoticeEntity } from "../entity";
import { NotFoundError } from "../error";
import { catchOrmErrors } from "./utilsService";

export class NoticeService {
  public static async add(
    purchaseName: string,
    subCategoryId: number,
    price: number,
    safeDeal: boolean = false,
    deliveryPossibility: boolean = false,
    ownerId?: number,
    description?: string,
    photoUrl?: string
  ): Promise<Notice> {
    const repN = getManager().getRepository(NoticeEntity);
    const repNS = getManager().getRepository(NoticeSubCategory);
    return catchOrmErrors(async () => {
      const notice = await repN.save({
        purchaseName: purchaseName,
        ownerId: ownerId,
        description: description,
        price: price,
        photoUrl: photoUrl,
        safeDeal: safeDeal,
        deliveryPossibility: deliveryPossibility,
        postDate: Date(),
      });
      repNS.save({ noticeId: notice.id, subCategoryId: subCategoryId });
      return notice;
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
    const rep = getManager().getRepository(NoticeEntity);
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

  public static async getSeveral(...ids: number[]): Promise<Notice[]> {
    const rep = getManager().getRepository(NoticeEntity);
    return await rep.findByIds(ids, { take: 10 });
  }

  public static async get(id: number): Promise<Notice> {
    const rep = getManager().getRepository(NoticeEntity);
    const notice: Notice | undefined = await rep.findOne({ id: id });
    if (notice) {
      return notice;
    }
    throw new NotFoundError();
  }

  public static async getAll(): Promise<Notice[]> {
    const rep = getManager().getRepository(Notice);
    return await rep.query("select * from notice");
  }

  public static async getAllBySubCategory(
    subCategoryId: number
  ): Promise<Notice[]> {
    const rep = getManager().getRepository(NoticeEntity);
    return await rep.query(
      `SELECT N.ID,
	      N.PURCHASE_NAME,
	      N.PRICE,
	      N.PHOTO_URL
      FROM NOTICE N
      RIGHT
        JOIN NOTICE_SUB_CATEGORY NSC ON N.ID = NSC.NOTICEID
      WHERE NSC.SUB_CATEGORYID = ${subCategoryId}
      ORDER BY N.POST_DATE;
      `
    );
  }

  public static async getAllByOwnerId(ownerId: number): Promise<Notice[]> {
    const rep = getManager().getRepository(NoticeEntity);
    return await rep.query(`select * from notice where owner_id=${ownerId}`);
  }

  public static async delete(id: number): Promise<Notice> {
    const rep = getManager().getRepository(NoticeEntity);
    let notice = await rep.findOne(id);
    if (!notice) throw new NotFoundError("notice");
    return await rep.remove(notice);
  }
}
