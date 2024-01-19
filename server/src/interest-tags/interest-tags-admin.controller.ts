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
import { InterestTagsService } from "./interest-tags.service"
import { IInterestTagsCollection } from "src/interfaces"
import { InterestTag } from "./interest-tag.entity"
import { InterestTagCategory } from "./interest-tag-category.entity"
import { CreateInterestTagDto } from "./create-interest-tag.dto"
import { ValidationError, validate } from "class-validator"
import { CreateInterestTagCategoryDto } from "./create-interest-tag-category.dto"

@Controller("admin/interestTags")
export class AdminInterestTagsController {

	constructor(
        private readonly userInterestsService: InterestTagsService,
	) { }

    @Get("getAll")
    @HttpCode(HttpStatus.OK)
	async adminGetAll(): Promise<IInterestTagsCollection[]> {
		return await this.userInterestsService.getAllInterests()
	}

    @Post("createInterestTag")
    @HttpCode(HttpStatus.OK)
    async adminCreateInterestTag(@Req() req, @Body() createInterestTagDto: CreateInterestTagDto): Promise<InterestTag> {
    	const errors: ValidationError[] = await validate(createInterestTagDto)
    	if (errors.length > 0) {
    		throw new BadRequestException(errors.map(e => e.toString()).join(", "))
    	}
    	return await this.userInterestsService.createInterestTag(createInterestTagDto)
    }

    @Post("createInterestTags")
    @HttpCode(HttpStatus.OK)
    async adminCreateInterestTags(@Req() req, @Body() createInterestTagDtos: CreateInterestTagDto[]): Promise<InterestTag[]> {
    	for(const interestTagDto of createInterestTagDtos) {
    		const errors: ValidationError[] = await validate(interestTagDto)
    		if (errors.length > 0) {
    			throw new BadRequestException(errors.map(e => e.toString()).join(", "))
    		}
    	}
    	return await this.userInterestsService.createInterestTags(createInterestTagDtos)
    }

    @Post("updateInterestTag")
    @HttpCode(HttpStatus.OK)
    async adminUpdateInterestTag(@Req() req, @Body() body): Promise<void> {
    	const interestId: number = body.interestId
    	const interestName: string = body.interestName
    	await this.userInterestsService.updateInterestTag(interestId, interestName)
    }
    
    @Post("deleteInterestTag")
    @HttpCode(HttpStatus.OK)
    async adminDeleteInterestTag(@Req() req, @Body() body): Promise<void> {
    	const interestId: number = body.interestId
    	await this.userInterestsService.deleteInterestTag(interestId)
    }

    @Post("createInterestTagCategory")
    @HttpCode(HttpStatus.OK)
    async adminCreateInterestTagCategory(@Req() req, @Body() newInterestTagCategory: CreateInterestTagCategoryDto): Promise<InterestTagCategory> {
    	const errors: ValidationError[] = await validate(newInterestTagCategory)
    	if (errors.length > 0) {
    		throw new BadRequestException(errors.map(e => e.toString()).join(", "))
    	}
    	return await this.userInterestsService.createInterestTagCategory(newInterestTagCategory)
    }

    @Post("createInterestTagCategories")
    @HttpCode(HttpStatus.OK)
    async adminCreateInterestTagCategories(@Req() req, @Body() newInterestTagCategories: CreateInterestTagCategoryDto[]): Promise<InterestTagCategory[]> {
    	for(const newInterestTagCategory of newInterestTagCategories) {
    		const errors: ValidationError[] = await validate(newInterestTagCategory)
    		if (errors.length > 0) {
    			throw new BadRequestException(errors.map(e => e.toString()).join(", "))
    		}
    	}
    	return await this.userInterestsService.createInterestTagCategories(newInterestTagCategories)
    }

    @Post("updateInterestTagCategory")
    @HttpCode(HttpStatus.OK)
    async adminUpdateInterestTagCategory(@Req() req, @Body() body): Promise<void> {
    	const categoryId: number = body.categoryId
    	const categoryName: string = body.categoryName
    	await this.userInterestsService.updateInterestTagCategory(categoryId, categoryName)
    }

    @Post("deleteInterestTagCategory")
    @HttpCode(HttpStatus.OK)
    async adminDeleteInterestTagCategory(@Req() req, @Body() body): Promise<void> {
    	const categoryId: number = body.categoryId
    	await this.userInterestsService.deleteInterestTagCategory(categoryId)
    }
}