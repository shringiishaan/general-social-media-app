import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Pop } from "src/pops/pop.entity" // Your Pop entity
import { User } from "src/users/user.entity" // Your User entity
import { CreatePopCommentDto } from "./dtos/create-pop-comment-dto"
import { UpdatePopCommentDto } from "./dtos/update-pop-comment-dto"
import { PopComment } from "./pop-comment.entity"

@Injectable()
export class PopCommentsService {

	constructor(
        @InjectRepository(PopComment) private commentRepository: Repository<PopComment>,
        @InjectRepository(Pop) private popRepository: Repository<Pop>
	) {}

	async createComment(popId: number, user: User, createCommentDto: CreatePopCommentDto): Promise<PopComment> {
		const pop: Pop = await this.popRepository.findOne({ where: { id: popId } })
		if (!pop) {
			throw new NotFoundException(`Pop with ID ${popId} not found`)
		}
		const comment: PopComment = this.commentRepository.create({
			...createCommentDto,
			pop,
			author: user
		})
		return this.commentRepository.save(comment)
	}

	async getCommentsByPop(popId: number): Promise<PopComment[]> {
		return this.commentRepository.find({ 
			where: { pop: { id: popId } },
			relations: ["author", "pop"]
		})
	}

	async updateComment(commentId: number, user: User, updateCommentDto: UpdatePopCommentDto): Promise<PopComment> {
		const comment: PopComment = await this.commentRepository.findOne({ where: { id: commentId } })
		if (!comment) {
			throw new NotFoundException(`PopComment with ID ${commentId} not found`)
		}
		// Optional: Check if the user is the author of the comment
		if (comment.author.id !== user.id) {
			throw new Error("Unauthorized: You can only update your own comments")
		}
		comment.text = updateCommentDto.text
		return this.commentRepository.save(comment)
	}

	async deleteComment(commentId: number, user: User): Promise<void> {
		const comment: PopComment = await this.commentRepository.findOne({ where: { id: commentId } })
		if (!comment) {
			throw new NotFoundException(`PopComment with ID ${commentId} not found`)
		}
		// Optional: Check if the user is the author of the comment
		if (comment.author.id !== user.id) {
			throw new Error("Unauthorized: You can only delete your own comments")
		}
		await this.commentRepository.remove(comment)
	}
}
