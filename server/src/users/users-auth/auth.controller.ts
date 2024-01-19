import {
	BadRequestException,
	Body, Controller, Get, HttpCode, HttpStatus,
	Post, Request, UnauthorizedException, UseGuards
} from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import { AuthService } from "./auth.service"
import { LocalAuthGuard } from "./local.strategy"
import { JwtAuthGuard } from "./jwt.strategy"
import { CreateUserDto, User } from "src/users/user.entity"
import { validate } from "class-validator"

@Controller("auth")
export class AuthController {

	constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
	) { }

    @Post("signIn")
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
	async login(@Request() req): Promise<{ user: User, token: string}> {
		try {
			const userId: number = req.user
			const { user, token } = await this.authService.signToken(userId)
			return { user, token }
		} catch {
			throw new UnauthorizedException()
		}
	}

    @Post("signUp")
    @HttpCode(HttpStatus.OK)
    async newUser(@Body() createUserDto: CreateUserDto): Promise<{ user: User, token: string}> {
    	const errors = await validate(createUserDto)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	const newUser: User = await this.usersService.create(createUserDto)
    	const { user, token } = await this.authService.signToken(newUser.id)
    	return { user, token }
    }

    @Get("getUser")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getUser(@Request() req): Promise<{ user: User }> {
    	const userId: number = req.user
    	const user: User = await this.usersService.findById(userId)
    	console.log(`getUser: ${user}`)
    	return { user }
    }

    @Post("checkPhoneNumberExists")
    @HttpCode(HttpStatus.OK)
    async checkPhoneNumberExists(@Body() body): Promise<{exists: boolean}> {
    	const phoneNumber: string = body.phoneNumber
    	const exists: boolean = await this.usersService.checkPhoneNumberExists(phoneNumber)
    	return { exists }
    }
}