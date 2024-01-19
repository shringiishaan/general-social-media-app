import { Module } from "@nestjs/common"
import { InterestTagsController } from "./interest-tags.controller"
import { ImagesModule } from "src/images/images.module"
import { AwsS3Module } from "src/aws-s3/aws-s3.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { InterestTagsService } from "./interest-tags.service"
import { InterestTag } from "./interest-tag.entity"
import { InterestTagCategory } from "./interest-tag-category.entity"
import { UserInterestTagsMap } from "./user-interest-tags-map.entity"
import { UsersModule } from "src/users/users.module"
import { AdminInterestTagsController } from "./interest-tags-admin.controller"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			InterestTag, 
			InterestTagCategory, 
			UserInterestTagsMap
		]),
		ImagesModule,
		AwsS3Module,
		UsersModule
	],
	controllers: [
		InterestTagsController,
		AdminInterestTagsController
	],
	providers: [
		InterestTagsService,
	],
	exports: [
		InterestTagsService
	]
})

export class InterestTagsModule { }