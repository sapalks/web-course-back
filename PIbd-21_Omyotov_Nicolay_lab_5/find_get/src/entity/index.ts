import { Password } from "./password";
import { ConnectionOptions } from "typeorm";
import { User } from "./user";
import { Notice } from "./notice";
import { Category } from "./category";
import { Message } from "./message";
import { NoticeSubCategory } from "./noticeSubCategory";
import { SubCategory } from "./subCategory";
import { AllCategories } from "./allCategories";

export const Entities = [
  User,
  Password,
  Notice,
  Category,
  Message,
  NoticeSubCategory,
  SubCategory,
  AllCategories,
];

// export const config = {
//   type: "postgres",
//   host: "192.168.1.72",
//   port: 7070,
//   username: "postgres",
//   password: "",
//   database: "db",
//   logging: true,
//   entities: Entities,
// } as ConnectionOptions;

export const config = {
  type: "postgres",
  host: "ec2-176-34-222-188.eu-west-1.compute.amazonaws.com",
  port: 5432,
  username: "vshohbbhckpyvt",
  password: "18d8b2e8e2da9c424ac3133d6c0aff1751a31869db6e6bf8b66d9761afdc7898",
  database: "dd1s0f04ddlgh4",
  logging: true,
  entities: Entities,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
} as ConnectionOptions;

export {
  User,
  Password,
  Notice,
  Category,
  Message,
  NoticeSubCategory,
  SubCategory,
};
