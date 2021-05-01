import { ConnectionOptions } from "typeorm";
import { User } from "./user";
import { Notice } from "./notice";
import { Category } from "./category";
import { Message } from "./message";
import { NoticeSubCategory } from "./noticeSubCategory";
import { SubCategory } from "./subCategory";

export const Entities = [
  User,
  Notice,
  Category,
  Message,
  NoticeSubCategory,
  SubCategory,
];

export const config = {
  type: "postgres",
  host: "192.168.1.72",
  port: 7070,
  username: "postgres",
  password: "",
  database: "db",
  logging: true,
  entities: Entities,
} as ConnectionOptions;

export { User, Notice, Category, Message, NoticeSubCategory, SubCategory };
