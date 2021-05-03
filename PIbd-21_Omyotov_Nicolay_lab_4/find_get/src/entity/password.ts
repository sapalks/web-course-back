import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Password {
  @PrimaryGeneratedColumn("increment")
  id: Number;

  @Column()
  text: string;

  @Column({ name: "user_id" })
  userId: Number;
}
