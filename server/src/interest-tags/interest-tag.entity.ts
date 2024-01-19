import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class InterestTag {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "varchar",
    	length: 100,
    	name: "name",
    	nullable: false,
    })
    	name: string

    @Column({
    	type: "int",
    	name: "category_id",
    	nullable: false,
    })
    	categoryId: number

    @Column({
    	type: "int",
    	name: "priority",
    	nullable: false,
    	default: 0
    })
    	priority: number

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}