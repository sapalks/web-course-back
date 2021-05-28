import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class AllCategories {
  @PrimaryColumn({ name: "subid" })
  subid: number;

  @PrimaryColumn({ name: "mainid" })
  mainid: number;

  @Column({ name: "maincategory" })
  maincategory: string;

  @Column({ name: "subcategory" })
  subcategory: string;
}
