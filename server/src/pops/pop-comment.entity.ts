import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm"
import { User } from "src/users/user.entity"
import { Pop } from "./pop.entity"

@Entity()
export class PopComment {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "varchar",
    	length: 1000,
    	name: "text",
    	nullable: false
    })
    	text: string

    @ManyToOne(() => Pop, pop => pop.comments)
    	pop: Pop

    @ManyToOne(() => User, user => user.comments)
    	author: User

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}