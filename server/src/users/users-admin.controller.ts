import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	HttpCode,
	HttpStatus
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { ValidationError, validate } from "class-validator"
import { CreateUserDto, User } from "./user.entity"
import { UsersService } from "./users.service"
import { ImagesService } from "src/images/images.service"
import { AwsS3Service } from "src/aws-s3/aws-s3.service"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { Image } from "src/images/image.entity"
import { profileImageMulterOptions } from "multer.config"

@Controller("admin/users")
export class AdminUsersController {

	constructor(
        private readonly usersService: UsersService,
        private readonly imagesService: ImagesService,
        private readonly awsS3Service: AwsS3Service
	) {}

	private async validateEntity(entity: any): Promise<void> {
		const errors = await validate(entity)
		if (errors.length > 0) {
			throw new BadRequestException(errors.map(e => e.toString()).join(", "))
		}
	}

	private async getUserFromRequest(req: any): Promise<User> {
		const userId: number = req.user
		const user: User = await this.usersService.findById(userId)
		if (!user) {
			throw new BadRequestException("User not found")
		}
		return user
	}

    @Get("getAll")
    @HttpCode(HttpStatus.OK)
	async adminGetAllUsers(): Promise<{ users: User[] }> {
		return { users: await this.usersService.findAll() }
	}

    @Post("createOne")
    @HttpCode(HttpStatus.OK)
    async adminCreateUser(@Body() newCreateUserDto: CreateUserDto): Promise<{ newUser: User }> {
    	await this.validateEntity(newCreateUserDto)
    	return { newUser: await this.usersService.create(newCreateUserDto) }
    }

    @Post("deleteOne")
    @HttpCode(HttpStatus.OK)
    async adminDeleteUser(@Body() { userId }): Promise<{ success: boolean }> {
    	return { success: (await this.usersService.delete(userId)).affected > 0 }
    }
}