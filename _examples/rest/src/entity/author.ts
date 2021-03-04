import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
@Unique('name', ['name'])
export class Author {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    born: number;

    @Column({ nullable: true })
    died?: number;

    @Column({ default: false })
    isDeleted: boolean = false;

}
