import { User } from "src/users/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Chat } from "./chat.entity"
import { ChatAttachment } from "./chat-attachment.entity"

@Entity()
export class ChatMessage {

    @PrimaryGeneratedColumn({ 
    	type: "int", 
    	name: "id" 
    })
    	id: number

    @Column({ 
    	type: "varchar", 
    	name: "message",
    	length: 255, 
    	nullable: true 
    })
    	message: string

    @ManyToOne(
    	() => User, 
    	user => user.id, {
    		nullable: false
    	}
    )
    	sender: User

    @ManyToOne(
    	() => Chat, 
    	chat => chat.messages, {
    		nullable: false
    	}
    )
    	chat: Chat

    @ManyToOne(
    	() => ChatAttachment, 
    	attachment => attachment.id, 
    	{ nullable: true }
    )
    	attachment: ChatAttachment

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}