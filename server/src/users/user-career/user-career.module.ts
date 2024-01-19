import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "src/users/users.module"
import { UserCareerController } from "./user-career.controller"
import { IndustryService } from "./industry.service"
import { JobRoleService } from "./job-role.service"
import { UserCareerService } from "./user-career.service"
import { Industry } from "./industry.entity"
import { JobRole } from "./job-role.entity"
import { UserCareer } from "./user-career.entity"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Industry,
			JobRole,
			UserCareer
		]),
		UsersModule
	],
	controllers: [
		UserCareerController
	],
	providers: [
		IndustryService,
		JobRoleService,
		UserCareerService
	],
	exports: [
		IndustryService,
		JobRoleService,
		UserCareerService
	]
})

export class UserCareerModule { }