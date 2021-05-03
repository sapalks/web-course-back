import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Password {
  @PrimaryColumn({ name: "user_id" })
  userId: Number;

  @Column()
  text: string;
}
