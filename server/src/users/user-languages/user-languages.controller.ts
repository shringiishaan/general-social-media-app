import {
	BadRequestException,
	Controller,
	Post,
	Req,
	HttpCode,
	HttpStatus,
	UseGuards
} from "@nestjs/common"
import { validate } from "class-validator"
import { UsersService } from "src/users/users.service"
import { UserLanguagesService } from "./user-languages.service"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { CreateLanguageDto, Language } from "./language.entity"
import { User } from "src/users/user.entity"
import { CreateUserLanguageMapDto, UserLanguageMap } from "./user-language-map.entity"

@Controller("userLanguages")
export class UserLanguagesController {

	constructor(
        private readonly usersService: UsersService,
        private readonly userLanguagesService: UserLanguagesService,
	) {}

	private async _validateEntity(entity: any): Promise<void> {
		const errors = await validate(entity)
		if (errors.length) {
			throw new BadRequestException(errors.map(error => error.toString()).join(", "))
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

    @Post("getAllLanguages")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
	async getAllLanguages(): Promise<{ languages: Language[] }> {
    	return { languages: await this.userLanguagesService.findAllLanguages() }
	}

    @Post("getAllLanguagesByUserId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllLanguagesByUserId(@Req() req): Promise<{ languages: Language[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	return { languages: await this.userLanguagesService.findAllLanguagesByUserId(user.id) }
    }

    @Post("createUserLanguageMap")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async createUserLanguageMap(@Req() req): Promise<{ success: boolean }> {
    	const user: User = await this.getUserFromRequest(req)
    	const { languageId } = req.body
    	if(!languageId) {
    		throw new BadRequestException("Language id is required")
    	}
    	const userLanguageMap: UserLanguageMap = await this.userLanguagesService.createNewUserLanguageMap({ userId: user.id, languageId })
    	return { success: Boolean(userLanguageMap) }
    }

    @Post("updateUserAllLanguageMaps")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async updateUserAllLanguageMaps(@Req() req): Promise<{ updatedUserLanguages: Language[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	const { languageIds } = req.body
    	if(!languageIds || !languageIds.length) {
    		throw new BadRequestException("Language id is required")
    	}
    	const createUserLanguageMapsDtos: CreateUserLanguageMapDto[] = languageIds.map(languageId => ({ 
    		userId: parseInt(user.id.toString()), languageId: parseInt(languageId.toString()) 
    	}))
    	console.log(createUserLanguageMapsDtos)
    	const updatedUserLanguageMaps: UserLanguageMap[] = await this.userLanguagesService.updateUserAllLanguageMaps(createUserLanguageMapsDtos)
    	const newLanguageIds: number[] = updatedUserLanguageMaps.map(m => m.languageId)
    	return { updatedUserLanguages: await this.userLanguagesService.findAllLanguagesByIds(newLanguageIds) }
    }

    @Post("deleteUserLanguageMap")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteUserLanguageMap(@Req() req): Promise<{ success: boolean }> {
    	const user: User = await this.getUserFromRequest(req)
    	const { languageId } = req.body
    	if(!languageId) {
    		throw new BadRequestException("Language id is required")
    	}
    	const { affected } = await this.userLanguagesService.deleteUserLanguageMap(user.id, languageId)
    	return { success: Boolean(affected > 0) }
    }

    @Post("deleteUserAllLanguageMaps")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteUserAllLanguageMaps(@Req() req): Promise<{ success: boolean }> {
    	const user: User = await this.getUserFromRequest(req)
    	const { affected } = await this.userLanguagesService.deleteUserAllLanguageMaps(user.id)
    	return { success: Boolean(affected > 0) }
    }
}