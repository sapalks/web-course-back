import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn("increment")
  id: Number;

  @Column({ nullable: true, name: "sender_id" })
  senderId?: Number;

  @Column({ nullable: true, name: "receiver_id" })
  receiverId?: Number;

  @Column()
  text: string;

  @Column()
  date: Date;
}
