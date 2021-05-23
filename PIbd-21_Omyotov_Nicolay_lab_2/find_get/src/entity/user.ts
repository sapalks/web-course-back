import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    name: string;

    @Column({ default: 0 })
    rate: number;

    @Column({ name: 'join_date'})
    joinDate: Date;

    @Column({ default: 0, name: 'num_reviews'})
    numReviews: number;

    @Column({ default: 0, name: 'num_subscribtions' })
    numSubscribtions: number;

    @Column({ default: 0, name: 'num_subscribers' })
    numSubscribers: number;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column()
    city: string;
}
