import { Request, Response } from "express";
import { CategoryService } from "../service/categoryService";
import { ok } from "./utilsController";

export async function getAll(request: Request, response: Response) {
  const catigories = await CategoryService.getAll();
  let result: {
    name: string;
    id: number;
    subCategories: [{ name: string; id: number }];
  }[] = [];
  let currentCategory = "";
  catigories.forEach((element) => {
    if (element.maincategory != currentCategory) {
      currentCategory = element.maincategory;
      result.push({
        name: element.maincategory,
        id: element.mainid,
        subCategories: [{ name: element.subcategory, id: element.subid }],
      });
    } else {
      result[result.length - 1].subCategories.push({
        name: element.subcategory,
        id: element.subid,
      });
    }
  });
  response.json(ok(result));
}
