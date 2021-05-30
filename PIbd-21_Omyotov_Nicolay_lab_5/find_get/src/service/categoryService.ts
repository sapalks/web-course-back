import { AllCategories } from "./../entity/allCategories";
import { getManager } from "typeorm";

export class CategoryService {
  public static async getAll(): Promise<AllCategories[]> {
    const rep = getManager().getRepository(AllCategories);
    return await rep.query("select * from allcategories");
  }
}
