import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Req, HttpCode, HttpStatus, BadRequestException } from "@nestjs/common"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { User } from "src/users/user.entity" // Your User entity
import { CreatePopCommentDto } from "./dtos/create-pop-comment-dto"
import { UpdatePopCommentDto } from "./dtos/update-pop-comment-dto"
import { PopCommentsService } from "./pop-comments.service"
import { PopComment } from "./pop-comment.entity"
import { UsersService } from "src/users/users.service"

@Controller("pop-comments")
export class PopCommentsController {

	constructor(
        private readonly popCommentsService: PopCommentsService,
        private readonly usersService: UsersService,
	) {}

	private async getUserFromRequest(req: any): Promise<User> {
		const userId: number = req.user
		const user: User = await this.usersService.findById(userId)
		if (!user) {
			throw new BadRequestException("User not found")
		}
		return user
	}

    @Post(":popId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
	async createComment(@Param("popId") popId: number, @Body() createCommentDto: CreatePopCommentDto, @Req() req): Promise<PopComment> {
		const user: User = await this.getUserFromRequest(req)
		return this.popCommentsService.createComment(popId, user, createCommentDto)
	}

    @Get(":popId")
    @UseGuards(JwtAuthGuard)
    async getCommentsByPop(@Param("popId") popId: number): Promise<PopComment[]> {
    	return this.popCommentsService.getCommentsByPop(popId)
    }

    @Put(":commentId")
    @UseGuards(JwtAuthGuard)
    async updateComment(@Param("commentId") commentId: number, @Body() updateCommentDto: UpdatePopCommentDto, @Req() req): Promise<PopComment> {
    	const user: User = await this.getUserFromRequest(req)
    	return this.popCommentsService.updateComment(commentId, user, updateCommentDto)
    }

    @Delete(":commentId")
    @UseGuards(JwtAuthGuard)
    async deleteComment(@Param("commentId") commentId: number, @Req() req): Promise<void> {
    	const user: User = await this.getUserFromRequest(req)
    	return this.popCommentsService.deleteComment(commentId, user)
    }
}
