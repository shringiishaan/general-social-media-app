import { User } from "src/users/user.entity"
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Chat } from "./chat.entity"
import { ChatMessage } from "./chat-message.entity"

@Entity()
export class ChatAttachment {

    @PrimaryGeneratedColumn({ 
    	type: "int", 
    	name: "id" 
    })
    	id: number

    @Column({ 
    	type: "varchar", 
    	name: "url",
    	length: 255, 
    	nullable: false
    })
    	url: string

    @Column({ 
    	type: "varchar", 
    	name: "file_type",
    	length: 255, 
    	nullable: false
    })
    	fileType: string

    @OneToOne(
    	() => ChatMessage, 
    	message => message.attachment
    )
    @JoinColumn()
    	message: ChatMessage

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}