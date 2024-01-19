import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	HttpCode,
	HttpStatus,
	Req,
	UseGuards
} from "@nestjs/common"
import { ValidationError, validate } from "class-validator"
import { UsersService } from "src/users/users.service"
import { UserLanguagesService } from "./user-languages.service"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { CreateLanguageDto, Language } from "./language.entity"
import { User } from "src/users/user.entity"
import { CreateUserLanguageMapDto, UserLanguageMap } from "./user-language-map.entity"

@Controller("admin/userLanguages")
export class AdminUserLanguagesController {

	constructor(
        private readonly userLanguagesService: UserLanguagesService,
	) {}

	private async _validateEntity(entity: any): Promise<void> {
		const errors = await validate(entity)
		if (errors.length) {
			throw new BadRequestException(errors.map(error => error.toString()).join(", "))
		}
	}

    @Post("createLanguage")
    @HttpCode(HttpStatus.OK)
	async adminCreateLanguage(@Body() createLanguageDto: CreateLanguageDto): Promise<{ newLanguage: Language }> {
		await this._validateEntity(createLanguageDto)
		return { newLanguage: await this.userLanguagesService.createNewLanguage(createLanguageDto) }
	}

    @Post("createLanguages")
    @HttpCode(HttpStatus.OK)
    async adminCreateLanguages(@Body() createLanguageDtos: CreateLanguageDto[]): Promise<{ newLanguages: Language[] }> {
    	for (const newLanguageDto of createLanguageDtos) {
    		await this._validateEntity(newLanguageDto)
    	}
    	return { newLanguages: await this.userLanguagesService.createNewLanguages(createLanguageDtos) }
    }

    @Post("createUserLanguageMap")
    @HttpCode(HttpStatus.OK)
    async adminCreateUserLanguageMap(@Body() newUserLanguageMap: CreateUserLanguageMapDto): Promise<{ success: boolean }> {
    	await this._validateEntity(newUserLanguageMap)
    	return { success: await this.userLanguagesService.createNewUserLanguageMap(newUserLanguageMap) !== null }
    }

    @Get("getAllLanguages")
    @HttpCode(HttpStatus.OK)
    async adminGetAllLanguages(): Promise<{ languages: Language[] }> {
    	return { languages: await this.userLanguagesService.findAllLanguages() }
    }

    @Get("getAllUserLanguages")
    @HttpCode(HttpStatus.OK)
    async adminGetAllUserLanguages(@Body() { userId }): Promise<{ languages: Language[] }> {
    	return { languages: await this.userLanguagesService.findAllLanguagesByUserId(userId) }
    }

    @Post("deleteLanguage")
    @HttpCode(HttpStatus.OK)
    async adminDeleteLanguage(@Body() { languageId }): Promise<{ success: boolean }> {
    	return { success: (await this.userLanguagesService.deleteLanguage(languageId)).affected > 0 }
    }

    @Post("deleteUserLanguageMap")
    @HttpCode(HttpStatus.OK)
    async adminDeleteUserLanguageMap(@Body() { userId, languageId }): Promise<{ success: boolean }> {
    	return  { success: (await this.userLanguagesService.deleteUserLanguageMap(userId, languageId)).affected > 0 }
    }

    @Post("deleteAllLanguages")
    @HttpCode(HttpStatus.OK)
    async deleteAllLanguages(@Body() body: any): Promise<{ success: boolean }> {
    	return  { success: (await this.userLanguagesService.deleteAllLanguages()).affected > 0 }
    }
}
