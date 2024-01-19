import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "src/users/users.module"
import { UserEducation } from "./user-education.entity"
import { UserEducationController } from "./user-education.controller"
import { UserEducationService } from "./user-educaiton.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEducation]),
		UsersModule
	],
	controllers: [
		UserEducationController
	],
	providers: [
		UserEducationService
	],
	exports: [
		UserEducationService
	]
})

export class UserEducationModule { }