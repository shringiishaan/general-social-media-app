import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Industry {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "varchar",
    	length: 200,
    	name: "name",
    	nullable: false,
    })
    	name: string

    @Column({
    	type: "int",
    	name: "priority",
    	nullable: false,
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