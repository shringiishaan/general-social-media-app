import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	HttpCode,
	HttpStatus,
	UseGuards,
} from "@nestjs/common"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { InterestTagsService } from "./interest-tags.service"
import { UsersService } from "src/users/users.service"
import { User } from "src/users/user.entity"
import { IInterestTagsCollection } from "src/interfaces"
import { InterestTag } from "./interest-tag.entity"
import { CreateInterestTagDto } from "./create-interest-tag.dto"
import { ValidationError, validate } from "class-validator"
import { CreateInterestTagCategoryDto } from "./create-interest-tag-category.dto"

@Controller("interestTags")
export class InterestTagsController {

	constructor(
        private readonly usersService: UsersService,
        private readonly userInterestsService: InterestTagsService,
	) { }

    @Post("createInterestCollection")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
	async createInterestCollection(
        @Req() req, 
        @Body() newCollection: {
            category: CreateInterestTagCategoryDto
            interests: CreateInterestTagDto[]
        }[]
	): Promise<IInterestTagsCollection[]> {
    	const userId: number = req.user
    	const user: User = await this.usersService.findById(userId)
    	if (!user) {
    		throw new BadRequestException()
    	}
    	for(const collection of newCollection) {
    		const errors: ValidationError[] = await validate(collection.category)
    		if (errors.length > 0) {
    			throw new BadRequestException(errors.map(e => e.toString()).join(", "))
    		}
    		for(const interestTagDto of collection.interests) {
    			const errors: ValidationError[] = await validate(interestTagDto)
    			if (errors.length > 0) {
    				throw new BadRequestException(errors.map(e => e.toString()).join(", "))
    			}
    		}
    	}
    	const newInterestCollections: IInterestTagsCollection[] = []
    	for(const collection of newCollection) {
    		const newCat = await this.userInterestsService.createInterestTagCategory({ name: collection.category.name, priority: 0 })
    		const newInterests: InterestTag[] = []
    		for(const interest of collection.interests) {
    			const newInterest = await this.userInterestsService.createInterestTag({ name: interest.name, categoryId: newCat.id, priority: 0 })
    			newInterests.push(newInterest)
    		}
    		newInterestCollections.push({
    			category: newCat,
    			interests: newInterests
    		})
    	}
    	return newInterestCollections
	}
    

    @Post("getMy")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMyInterests(@Req() req, @Body() body): Promise<IInterestTagsCollection[]> {
    	const userId: number = req.user
    	const user: User = await this.usersService.findById(userId)
    	if (!user) {
    		throw new BadRequestException()
    	}
    	return this.userInterestsService.getAllInterestsByUserId(userId)
    }

    @Get("getAll")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllInterests(@Req() req): Promise<IInterestTagsCollection[]> {
    	return this.userInterestsService.getAllInterests()
    }

    @Post("update")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async updateInterestTags(@Req() req, @Body() collections: IInterestTagsCollection[]): Promise<void> {
    	const userId: number = req.user
    	const user: User = await this.usersService.findById(userId)
    	if (!user) {
    		throw new BadRequestException()
    	}
    	await this.userInterestsService.updateInterestTags(userId, collections)
    }
}