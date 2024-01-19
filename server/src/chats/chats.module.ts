import { Module } from "@nestjs/common"
import { ChatController } from "./chats.controller"
import { Chat } from "./chat.entity"
import { ChatsService } from "./chats.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserChat } from "./user-chat.entity"
import { ChatMessage } from "./chat-message.entity"
import { ChatAttachment } from "./chat-attachment.entity"
import { ChatReaction } from "./chat-reaction.entity"
import { UsersModule } from "src/users/users.module"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Chat,
			UserChat,
			ChatMessage,
			ChatAttachment,
			ChatReaction
		]),
		UsersModule
	],
	controllers: [
		ChatController
	],
	providers: [
		ChatsService,
	],
})

export class ChatsModule { }