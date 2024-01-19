import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	HttpCode,
	HttpStatus,
} from "@nestjs/common"
import { UserEducationService } from "./user-educaiton.service"
import { CreateEducationDto, UserEducation } from "./user-education.entity"
import { User } from "src/users/user.entity"
import { UsersService } from "src/users/users.service"
import { ValidationError, validate } from "class-validator"

@Controller("userEducation")
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

    @Get("getAllUserEducationsByUserId")
    @HttpCode(HttpStatus.OK)
	async getAllUserEducationsByUserId(@Body() {userId}): Promise<{ userEducations: UserEducation[] }> {
    	return { userEducations: await this.userEducationsService.findAllUserEducationByUserId(userId) }
	}

    @Post("adminCreateUserEducation")
    @HttpCode(HttpStatus.OK)
    async adminCreateUserEducation(@Body() newUserEducation: CreateEducationDto): Promise<UserEducation> {
    	const errors: ValidationError[] = await validate(newUserEducation)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	return this.userEducationsService.createNewUserEducation(newUserEducation)
    }

    @Post("adminDeleteUserEducationById")
    @HttpCode(HttpStatus.OK)
    async adminDeleteUserEducationById(@Body() {userEducationId}): Promise<void> {
    	await this.userEducationsService.deleteUserEducationById(userEducationId)
    }

    @Post("adminDeleteAllUserEducationsByUserId")
    @HttpCode(HttpStatus.OK)
    async adminDeleteAllUserEducationsByUserId(@Body() {userId}): Promise<void> {
    	await this.userEducationsService.deleteAllUserEducationsByUserId(userId)
    }
}