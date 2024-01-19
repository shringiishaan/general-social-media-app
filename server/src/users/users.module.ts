import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { ImagesModule } from "src/images/images.module"
import { AwsS3Module } from "src/aws-s3/aws-s3.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.entity"
import { AdminUsersController } from "./users-admin.controller"

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		ImagesModule,
		AwsS3Module
	],
	controllers: [
		UsersController,
		AdminUsersController
	],
	providers: [
		UsersService,
	],
	exports: [
		UsersService
	]
})

export class UsersModule { }