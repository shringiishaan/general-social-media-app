import { Module } from "@nestjs/common"
import { UsersModule } from "src/users/users.module"
import { AllLocationsController } from "./all-locations.controller"
import { AllLocationsService } from "./all-locations.service"
import { GoogleLocationsModule } from "../google-locations/google-locations.module"
import { MapPinsModule } from "../map-pins/map-pins.module"
import { AdminAllLocationsController } from "./all-locations-admin.controller"

@Module({
	imports: [
		UsersModule,
		GoogleLocationsModule,
		MapPinsModule
	],
	controllers: [
		AllLocationsController,
		AdminAllLocationsController
	],
	providers: [
		AllLocationsService
	],
	exports: [
		AllLocationsService
	]
})

export class AllLocationsModule { }