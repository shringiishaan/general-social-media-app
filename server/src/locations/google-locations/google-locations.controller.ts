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
import { UsersService } from "src/users/users.service"
import { User } from "src/users/user.entity"
import { GoogleLocationsService } from "./google-locations.service"
import { IAppLocation } from "src/interfaces"

@Controller("googleLocations")
export class GoogleLocationsController {

	constructor(
        private readonly usersService: UsersService,
        private readonly locationsService: GoogleLocationsService,
	) { }

	private async getUserFromRequest(req: any): Promise<User> {
		const userId: number = req.user
		const user: User = await this.usersService.findById(userId)
		if (!user) {
			throw new BadRequestException("User not found")
		}
		return user
	}

    @Post("getAll")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
	async getMyInterests(@Req() req, @Body() body): Promise<IAppLocation[]> {
    	const user: User = await this.getUserFromRequest(req)
		return this.locationsService.getAllLocations()
	}
}