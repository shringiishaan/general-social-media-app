import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Language } from "./language.entity"
import { UserLanguageMap } from "./user-language-map.entity"
import { UserLanguagesController } from "./user-languages.controller"
import { UserLanguagesService } from "./user-languages.service"
import { UsersModule } from "src/users/users.module"
import { AdminUserLanguagesController } from "./user-languages-admin.controller"

@Module({
	imports: [
		TypeOrmModule.forFeature([Language, UserLanguageMap]),
		UsersModule
	],
	controllers: [
		UserLanguagesController,
		AdminUserLanguagesController
	],
	providers: [
		UserLanguagesService
	],
	exports: [
		UserLanguagesService
	]
})

export class UserLanguagesModule { }