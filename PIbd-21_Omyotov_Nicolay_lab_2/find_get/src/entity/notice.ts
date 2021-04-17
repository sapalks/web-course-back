import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Notice {
  @PrimaryGeneratedColumn("increment")
  id: Number;

  @Column({ name: "purchase_name" })
  purchaseName: string;

  @Column({ nullable: true, name: "owner_id" })
  ownerId?: Number;

  @Column()
  description?: string;

  @Column()
  price: Number;

  @Column({ nullable: true, name: "photo_url" })
  photoUrl?: string;

  @Column({ default: false, name: "safe_deal" })
  safeDeal: boolean;

  @Column({ default: false, name: "delivery_possibility" })
  deliveryPossibility: boolean;

  @Column({ name: "post_date" })
  postDate: Date;
}
