import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ default: false })
    isDeleted: boolean = false;

}
