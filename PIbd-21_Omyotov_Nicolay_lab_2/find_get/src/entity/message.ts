import { Entity, Column} from "typeorm";

@Entity()
export class Message {

    @Column({ nullable: true, name: 'sender_id' })
    senderId?: Number;

    @Column({ nullable: true, name: 'receiver_id' })
    receiverId?: Number;

    @Column()
    name: string;

    @Column()
    date: Date;
}
