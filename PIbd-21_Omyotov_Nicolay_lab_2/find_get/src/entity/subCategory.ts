import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SubCategory {

    @PrimaryGeneratedColumn('increment')
    id: Number;

    @Column()
    name: string;

    @Column({ name: 'parent_category_id'})
    parentCategoryId: Number;
}
