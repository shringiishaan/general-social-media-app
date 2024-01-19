import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { ChatMessage } from "./chat-message.entity"

@Entity()
export class Chat {

    @PrimaryGeneratedColumn({ 
    	type: "int", 
    	name: "id" 
    })
    	id: number

    @Column({ 
    	type: "varchar", 
    	name: "group_name",
    	length: 255, 
    	nullable: true 
    })
    	groupName: string

    @OneToMany(
    	() => ChatMessage,
    	chatMessage => chatMessage.chat
    )
    	messages: ChatMessage[]

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}