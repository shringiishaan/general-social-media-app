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

@Controller("users")
export class UsersController {

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

    @Post("setUserAvatarImage")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor("avatarImg", profileImageMulterOptions))
	async setUserAvatarImage(@UploadedFile() file: Express.Multer.File, @Req() req): Promise<{ avatarImageId: string }> {
    	if (!file) {
    		throw new BadRequestException("File not provided")
    	}
    	const user = await this.getUserFromRequest(req)
    	if (user.avatarImageId) {
    		await this.imagesService.delete(user.avatarImageId)
    		await this.awsS3Service.deleteFromStorage(user.avatarImageId.toString())
    	}
    	const image: Image = await this.imagesService.create()
    	try {
    		await this.awsS3Service.uploadMulterToStorage(file.filename, image.id.toString(), user.id)
    	} catch (error) {
    		console.error(error)
    		throw new BadRequestException("Error uploading image to storage")
    	}
    	await this.usersService.setAvatarImageId(user.id, image.id)
    	return { avatarImageId: image.id.toString() }
	}

    @Post("updateUserFirstName")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async updateUserFirstName(@Req() req, @Body() { firstName }): Promise<{ success: boolean }> {
    	const user = await this.getUserFromRequest(req)
    	return { success: ((await this.usersService.updateFirstName(user.id, firstName)).affected > 0) }
    }

    @Post("updateUserLastName")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async updateUserLastName(@Req() req, @Body() { lastName }): Promise<{success: boolean}> {
    	const user = await this.getUserFromRequest(req)
    	return { success: (await this.usersService.updateLastName(user.id, lastName)).affected > 0 }
    }

    @Post("getUserByUserId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getUserByUserId(@Req() req, @Body() { userId }): Promise<{user: User}> {
    	const user = await this.getUserFromRequest(req)
    	const userProfile: User = await this.usersService.findById(userId)
    	return { user: userProfile }
    }

    @Post("getAllUsersList")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllUsersList(@Req() req): Promise<{users: User[]}> {
    	const user = await this.getUserFromRequest(req)
    	const users: User[] = await this.usersService.findAll()
    	return { users }
    }
}