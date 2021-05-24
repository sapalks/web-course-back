import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class NoticeSubCategory {
  @PrimaryColumn({ name: "noticeid" })
  noticeId: Number;

  @Column({ name: "sub_categoryid" })
  subCategoryId: Number;
}
