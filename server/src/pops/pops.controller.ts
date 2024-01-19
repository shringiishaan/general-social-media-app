import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from "@nestjs/common"
import { CreateNewPopDto, PopsService, UpdatePopDto } from "./pops.service"
import { UsersService } from "src/users/users.service"
import { User } from "src/users/user.entity"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { Pop } from "./pop.entity"

@Controller("pops")
export class PopController {

	constructor(
        private readonly popsService: PopsService,
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

    @Get("getPop/:popId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
	async getPop(@Req() req, @Param("popId") popId: number): Promise<object> {
    	const user: User = await this.getUserFromRequest(req)
		return {
			pop: await this.popsService.findPopById(popId)
		}
	}

    @Get("getAllPops")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllPops(@Req() req): Promise<object> {
    	const user: User = await this.getUserFromRequest(req)
    	return {
    		pops: await this.popsService.getAllPops()
    	}
    }
    @Post("createPop")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createPop(@Req() req, @Body() createNewPopDto: CreateNewPopDto): Promise<Pop> {
    	const user: User = await this.getUserFromRequest(req)
    	return await this.popsService.createNewPop(createNewPopDto, user)
    }

    @Put("updatePop/:popId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async updatePop(@Req() req, @Param("popId") popId: number, @Body() updatePopDto: UpdatePopDto): Promise<Pop> {
    	const user: User = await this.getUserFromRequest(req)
    	return await this.popsService.updatePop(popId, updatePopDto)
    }

    @Delete("deletePop/:popId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deletePop(@Req() req, @Param("popId") popId: number): Promise<void> {
    	const user: User = await this.getUserFromRequest(req)
    	return await this.popsService.deletePop(popId)
    }
}