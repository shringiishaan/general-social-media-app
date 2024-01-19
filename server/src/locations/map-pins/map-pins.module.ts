import { Module } from "@nestjs/common"
import { MapPinsController } from "./map-pins.controller"
import { MapPinsService } from "./map-pins.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MapPin } from "./map-pin.entity"
import { PinUserMap } from "./pin-user-map.entity"
import { AdminMapPinsController } from "./map-pins-admin.controller"
import { UsersModule } from "src/users/users.module"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			MapPin,
			PinUserMap
		]),
		UsersModule
	],
	controllers: [
		MapPinsController,
		AdminMapPinsController
	],
	providers: [
		MapPinsService,
	],
	exports: [
		MapPinsService
	]
})

export class MapPinsModule { }