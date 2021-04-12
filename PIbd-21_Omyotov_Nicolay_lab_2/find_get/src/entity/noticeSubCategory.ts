import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class NoticeSubCategory {

    @Column({ name: 'noticeid' })
    noticeId: Number;

    @Column({ name: 'sub_categoryid' })
    subCategoryId: Number;
}