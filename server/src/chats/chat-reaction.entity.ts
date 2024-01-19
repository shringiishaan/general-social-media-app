import { User } from "src/users/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { ChatMessage } from "./chat-message.entity"

@Entity()
export class ChatReaction {

    @PrimaryGeneratedColumn({ 
    	type: "int", 
    	name: "id" 
    })
    	id: number

    @ManyToOne(
    	() => User, 
    	user => user.id, {
    		nullable: false
    	}
    )
    	user: User

    @ManyToOne(
    	() => ChatMessage, 
    	message => message.id, {
    		nullable: false
    	}
    )
    	message: ChatMessage

    @Column({ 
    	type: "varchar", 
    	name: "emoji",
    	length: 50, 
    	nullable: false
    })
    	url: string

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}