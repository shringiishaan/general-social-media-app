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
import { AllLocationsService } from "./all-locations.service"
import { IAppLocation } from "src/interfaces"

@Controller("appLocations")
export class AllLocationsController {

	constructor(
        private readonly usersService: UsersService,
        private readonly locationsService: AllLocationsService,
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
		console.log(`app locations get all for user: ${user}`)
    	if (!user) {
    		throw new BadRequestException()
    	}
		return this.locationsService.getAllLocations()
	}
}