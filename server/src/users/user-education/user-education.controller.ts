import {
	BadRequestException,
	Body,
	Controller,
	Get,
	UseGuards,
	Post,
	HttpCode,
	HttpStatus,
	Req,
} from "@nestjs/common"
import { UserEducationService } from "./user-educaiton.service"
import { CreateEducationDto, UserEducation } from "./user-education.entity"
import { User } from "src/users/user.entity"
import { UsersService } from "src/users/users.service"
import { ValidationError, validate } from "class-validator"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"

@Controller("educations")
export class UserEducationController {

	constructor(
        private readonly userEducationsService: UserEducationService,
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

    @Get("adminGetAllUserEducationsByUserId")
    @HttpCode(HttpStatus.OK)
	async getAllUserEducationsByUserId(@Body() {userId}): Promise<{ userEducations: UserEducation[] }> {
    	return { userEducations: await this.userEducationsService.findAllUserEducationByUserId(userId) }
	}

    @Post("getMyEducations")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMyEducations(@Req() req: Request): Promise<{ myEducations: UserEducation[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	return { myEducations: await this.userEducationsService.findAllUserEducationByUserId(user.id) }
    }

    @Post("createMyEducations")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async createMyEducations(@Req() req: Request, @Body() newUserEducations: CreateEducationDto[]): Promise<{ myEducations: UserEducation[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	newUserEducations.map(newUserEducation => newUserEducation.userId = user.id)
    	const errors: ValidationError[] = await validate(newUserEducations)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	return { myEducations: await this.userEducationsService.createNewUserEducations(newUserEducations) }
    }

    @Post("updateMyEducations")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async updateMyEducations(@Req() req: Request, @Body() updatedUserEducations: UserEducation[]): Promise<{ myEducations: UserEducation[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	if(!updatedUserEducations || !updatedUserEducations.length) {
    		throw new BadRequestException("No user educations provided")
    	}
    	updatedUserEducations.map(newUserEducation => newUserEducation.userId = user.id)
    	const errors: ValidationError[] = await validate(updatedUserEducations)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	await this.userEducationsService.deleteAllUserEducationsByUserId(user.id)
    	return { myEducations: await this.userEducationsService.createNewUserEducations(updatedUserEducations) }
    }

    @Post("deleteMyEducation")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteMyEducation(@Req() req: Request, @Body() { myEducationId }): Promise<{ success: boolean }> {
     	const user: User = await this.getUserFromRequest(req)
    	return { success: (await this.userEducationsService.deleteUserEducationById(myEducationId)).affected > 0 }
    }
}