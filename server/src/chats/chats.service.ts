import { Injectable } from "@nestjs/common"
import { Chat } from "./chat.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { EntityManager, In, Repository, Transaction } from "typeorm"
import { ChatMessage } from "./chat-message.entity"
import { UserChat } from "./user-chat.entity"
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { EUserChatRole } from "src/interfaces"
import { User } from "src/users/user.entity"

@Injectable()
export class ChatsService {

	constructor(
        @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
        @InjectRepository(UserChat) private readonly userChatRepository: Repository<UserChat>,
        @InjectRepository(ChatMessage) private readonly chatMessageRepository: Repository<ChatMessage>,
	) { }

	async createNewChat(userId: number, userId2: number): Promise<Chat> {
		const chat = new Chat()
		chat.groupName = `My Chat ${userId} ${userId2}`
		const savedChat = await this.chatRepository.save(chat)
		const userChat = new UserChat()
		userChat.user = { id: userId } as any
		userChat.chat = savedChat
		userChat.role = EUserChatRole.ADMIN
		await this.userChatRepository.save(userChat)
		const userChat2 = new UserChat()
		userChat2.user = { id: userId2 } as any
		userChat2.chat = savedChat
		userChat2.role = EUserChatRole.ADMIN
		await this.userChatRepository.save(userChat2)
		return savedChat
	}

	async getChatsByTwoUsers(userId1: number, userId2: number): Promise<Chat[]> {
		const user1Chats: UserChat[] = await this.userChatRepository.find({ where: { user: { id: userId1 } } })
		const user1ChatIds: number[] = user1Chats.map(chat => chat.id)
		const userChatsWithBothUsers: UserChat[] = await this.userChatRepository.find({
			where: {
				user: { id: userId2 },
				chat: { id: In(user1ChatIds) }
			}, 
			relations: ["chat"]
		})
		const chatsWithBothUsers: Chat[] = userChatsWithBothUsers.map(uc => uc.chat)
		return chatsWithBothUsers
	}

	async getChatByOnlyTwoUsers(userId1: number, userId2: number): Promise<Chat[]> {
		const user1Chats: UserChat[] = await this.userChatRepository.find({ where: { user: { id: userId1 } }, relations: ["chat"] })
		const user1ChatIds: number[] = user1Chats.map(uc => uc.chat.id)
		const user2Chats: UserChat[] = await this.userChatRepository.find({ where: { user: { id: userId2 } }, relations: ["chat"] })
		const user2ChatIds: number[] = user2Chats.map(uc => uc.chat.id)
		const commonChatIds: number[] = user1ChatIds.filter(chatId => user2ChatIds.includes(chatId))
		const exclusiveChats: Chat[] = []
		for (const chatId of commonChatIds) {
			const participants = await this.userChatRepository.count({ where: { chat: { id: chatId } } })
			if (participants === 2) {
				const chat = await this.chatRepository.findOne({ where: { id: chatId } })
				exclusiveChats.push(chat)
			}
		}
		return exclusiveChats
	}

	async findChatById(chatId: number): Promise<Chat> {
		return await this.chatRepository.findOne({ where: { id: chatId } })
	}

	async getMyChats(userId: number): Promise<Chat[]> {
		const userChats = await this.userChatRepository.find({ where: { user: { id: userId } }, relations: ["chat"] })
		return userChats.map(uc => uc.chat)
	}

	async getAllChats(): Promise<Chat[]> {
		return await this.chatRepository.find()
	}

	async addUserToChat(userId: number, chatId: number): Promise<UserChat> {
		const userChat = new UserChat()
		userChat.user = { id: userId } as any
		userChat.chat = { id: chatId } as any
		return await this.userChatRepository.save(userChat)
	}

	async removeUserFromChat(userId: number, chatId: number): Promise<void> {
		const userChat = await this.userChatRepository.findOne({ where: { user: { id: userId }, chat: { id: chatId } } })
		if (userChat) {
			await this.userChatRepository.remove(userChat)
		}
	}

	async findUserChats(userId: number): Promise<UserChat[]> {
		return await this.userChatRepository.find({
			where: { user: { id: userId } }
		})
	}

	async changeUserRole(userId: number, chatId: number, newRole: EUserChatRole): Promise<UserChat> {
		const userChat = await this.userChatRepository.findOne({ where: { user: { id: userId }, chat: { id: chatId } } })
		if (userChat) {
			userChat.role = newRole
			return await this.userChatRepository.save(userChat)
		}
	}

	async findUsersInChat(chatId: number): Promise<User[]> {
		const userChats = await this.userChatRepository.find({ where: { chat: { id: chatId } } })
		return userChats.map(uc => uc.user)
	}

	async deleteChat(chatId: number): Promise<void> {
		const chat = await this.chatRepository.findOne({ where: { id: chatId } })
		if (chat) {
			await this.chatRepository.remove(chat)
		}
	}

	async updateChatName(chatId: number, newGroupName: string): Promise<Chat> {
		const chat = await this.chatRepository.findOne({ where: { id: chatId } })
		if (chat) {
			chat.groupName = newGroupName
			return await this.chatRepository.save(chat)
		}
	}
	async createMessage(senderId: number, chatId: number, messageText: string): Promise<ChatMessage> {
		const message = new ChatMessage()
		message.sender = { id: senderId } as User
		message.chat = { id: chatId } as any
		message.message = messageText
		return await this.chatMessageRepository.save(message)
	}

	async findMessagesByChatId(chatId: number): Promise<ChatMessage[]> {
		return await this.chatMessageRepository.find({
			where: { chat: { id: chatId } }
		})
	}

	async deleteMessage(messageId: number): Promise<void> {
		const message = await this.chatMessageRepository.findOne({ where: { id: messageId } })
		if (message) {
			await this.chatMessageRepository.remove(message)
		}
	}
}

export class CreateNewChatDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "Chat name is too short" })
    @MaxLength(200, { message: "Chat name is too long" })
    	chatGroupName: string
}
