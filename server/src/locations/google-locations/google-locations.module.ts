import { Module } from "@nestjs/common"
import { UsersModule } from "src/users/users.module"
import { GoogleLocationsController } from "./google-locations.controller"
import { GoogleLocationsService } from "./google-locations.service"

@Module({
	imports: [
		UsersModule
	],
	controllers: [
		GoogleLocationsController
	],
	providers: [
		GoogleLocationsService
	],
	exports: [
		GoogleLocationsService
	]
})

export class GoogleLocationsModule { }