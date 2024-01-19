import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	UseGuards,
	HttpCode,
	HttpStatus
} from "@nestjs/common"
import { MapPin } from "./map-pin.entity"
import { MapPinsService } from "./map-pins.service"
import { CreateMapPinDto } from "./create-map-pin.dto"

@Controller("admin/mapPins")
export class AdminMapPinsController {

	constructor(
        private readonly mapPinsService: MapPinsService,
	) { }

	@Get("getAll")
    @HttpCode(HttpStatus.OK)
	async adminGetAll(): Promise<{ mapPins: MapPin[] }> {
		return { mapPins: await this.mapPinsService.findAllMapPins() }
	}

	@Post("createMapPin")
    @HttpCode(HttpStatus.OK)
	async adminCreateMapPin(@Body() body: CreateMapPinDto): Promise<MapPin> {
		return this.mapPinsService.createMapPin(body)
	}

	@Post("createMapPins")
    @HttpCode(HttpStatus.OK)
	async adminCreateMapPins(@Body() body: { pins: CreateMapPinDto[] }): Promise<MapPin[]> {
		return this.mapPinsService.createMapPins(body.pins)
	}

	@Post("updateMapPinLocation")
    @HttpCode(HttpStatus.OK)
	async adminUpdateMapPinLocation(@Body() body: any): Promise<void> {
		return this.mapPinsService.updateMapPinLocation(body.id, body.latitude, body.longitude)
	}

    @Post("updateMapPinUsersCount")
    @HttpCode(HttpStatus.OK)
	async adminUpdateMapPinUsersCount(@Body() body: any): Promise<void> {
		return this.mapPinsService.updateMapPinUsersCount(body.id, body.usersCount)
	}
    
    @Post("updateMapPinName")
    @HttpCode(HttpStatus.OK)
    async adminUpdateMapPinName(@Body() body: any): Promise<void> {
    	return this.mapPinsService.updateMapPinName(body.id, body.name)
    }

	@Post("deleteMapPin")
    @HttpCode(HttpStatus.OK)
    async adminDeleteMapPin(@Body() body): Promise<void> {
    	await this.mapPinsService.deletePin(body.mapPinId)
    }
}