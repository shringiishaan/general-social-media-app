import { User } from "src/users/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Chat } from "./chat.entity"
import { EUserChatRole } from "src/interfaces"

@Entity()
export class UserChat {

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
    	() => Chat, 
    	chat => chat.id, {
    		nullable: false
    	}
    )
    	chat: Chat

    @Column({ 
    	type: "enum", 
    	enum: EUserChatRole,
    	default: EUserChatRole.MEMBER,
    })
    	role: EUserChatRole

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}