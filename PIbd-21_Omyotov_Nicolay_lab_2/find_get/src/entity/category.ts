import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    name: string;
}
