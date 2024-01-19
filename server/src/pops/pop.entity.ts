import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToOne } from "typeorm"
import { User } from "src/users/user.entity"
import { PopComment } from "./pop-comment.entity"

@Entity()
export class Pop {

    @PrimaryGeneratedColumn({ 
    	type: "int", 
    	name: "id" 
    })
    	id: number

    @ManyToOne(
    	() => User,
    	user => user.pops
    )
    	owner: User

    @Column({ 
    	type: "varchar", 
    	name: "text",
    	length: 1000, 
    	nullable: true 
    })
    	text: string

    @OneToMany(
    	() => PopComment, 
    	comment => comment.pop
    )
    	comments: PopComment[]


    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}