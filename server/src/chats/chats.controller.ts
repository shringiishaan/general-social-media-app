import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from "@nestjs/common"
import { ChatsService } from "./chats.service"
import { UsersService } from "src/users/users.service"
import { User } from "src/users/user.entity"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { UserChat } from "./user-chat.entity"
import { Chat } from "./chat.entity"

@Controller("chats")
export class ChatController {

	constructor(
        private readonly chatsService: ChatsService,
        private readonly usersService: UsersService,
	) { }

	private async getUserFromRequest(req: any): Promise<User> {
		const userId: number = req.user
		const user: User = await this.usersService.findById(userId)
		if (!user) {
			throw new BadRequestException("User not found")
		}
		return user
	}

    @Get("getChat/:chatId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
	async getChat(@Req() req, @Param("chatId") chatId: number): Promise<object> {
    	const user: User = await this.getUserFromRequest(req)
		return {
			chat: await this.chatsService.findChatById(chatId)
		}
	}

    @Post("getOrCreateChatWithUserId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getOrCreateChatWithUserId(@Req() req, @Body() body): Promise<{ chat: Chat }> {
    	const user: User = await this.getUserFromRequest(req)
    	const otherUserId = body.otherUserId
    	const chats: Chat[] = await this.chatsService.getChatByOnlyTwoUsers(otherUserId, user.id)
    	if(!chats || !chats.length) {
    		const chat = await this.chatsService.createNewChat(user.id, otherUserId)
    		return { chat }
    	} else {
    		return { chat: chats[0] }
    	}
    }

    @Post("getMyChats")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMyChats(@Req() req, @Body() body): Promise<{chats: Chat[]}> {
    	const user: User = await this.getUserFromRequest(req)
    	const myUserChats: Chat[] = await this.chatsService.getMyChats(user.id)
    	return {
    		chats: myUserChats
    	}
    }

    @Post("createMessage")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async createMessage(@Req() req, @Body() body): Promise<object> {
    	const user: User = await this.getUserFromRequest(req)
    	const { chatId, message } = body
    	return {
    		message: await this.chatsService.createMessage(user.id, chatId, message)
    	}
    }

    @Get("getMessages/:chatId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMessagesByChat(@Req() req, @Param("chatId") chatId: number): Promise<object> {
    	const user: User = await this.getUserFromRequest(req)
    	return {
    		messages: await this.chatsService.findMessagesByChatId(chatId)
    	}
    }

    @Delete("deleteMessage/:messageId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteMessage(@Req() req, @Param("messageId") messageId: number): Promise<object> {
    	const user: User = await this.getUserFromRequest(req)
    	await this.chatsService.deleteMessage(messageId)
    	return { status: "Message deleted successfully." }
    }
}