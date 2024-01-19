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
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { IAppLocation } from "src/interfaces"
import { PinUserMap } from "./pin-user-map.entity"
import { User } from "src/users/user.entity"
import { UsersService } from "src/users/users.service"

@Controller("mapPins")
export class MapPinsController {

	constructor(
        private readonly mapPinsService: MapPinsService,
        private readonly usersService: UsersService,
	) { }

	private async getUserFromRequest(req: any): Promise<User> {
		const userId: number = req.user
		const user: User = await this.usersService.findById(userId)
		if (!user) {
			throw new BadRequestException("User not found")
		}
		return user
	}

    @Post("getAllMapPins")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
	async getAllMapPins(@Req() req, @Body() body): Promise<{ allMapPins: MapPin[], myMapPins: MapPin[] }> {
    	const user: User = await this.getUserFromRequest(req)
		const allMapPins: MapPin[] = await this.mapPinsService.findAllMapPins()
		const myMapPins: MapPin[] = await this.mapPinsService.findMapPinsByUserId(user.id)
		console.log(`fetching ${allMapPins.length} all pins and ${myMapPins.length} my pins for user ${user.id}`)
    	return { allMapPins, myMapPins }
	}

    @Post("getMapPinById")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMapPinById(@Body() {mapPinId}): Promise<{ mapPin: MapPin }> {
    	console.log(`getMapPinById: ${mapPinId}`)
    	const mapPin: MapPin = await this.mapPinsService.findMapPinById(mapPinId)
    	console.log(`getMapPinById: ${mapPin}`)
    	return { mapPin }
    }

    @Post("getAllUsersByMapPinId")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllUsersByMapPinId(@Body() {mapPinId}): Promise<{ users: User[] }> {
    	console.log(`getAllUsersByMapPinId: ${mapPinId}`)
    	const users: User[] = await this.mapPinsService.findAllUsersByMapPinId(mapPinId)
    	console.log(`getAllUsersByMapPinId: ${users.length}`)
    	return { users }
    }

    @Post("getAllByLocationArea")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMapPinsByLocationArea(@Body() body): Promise<{ mapPins: MapPin[] }> {
    	const minLat: number = body.minLat
    	const maxLat: number = body.maxLat
    	const minLng: number = body.minLng
    	const maxLng: number = body.maxLng
    	return { mapPins: await this.mapPinsService.findMapPinsByLocationArea(minLat, maxLat, minLng, maxLng) }
    }

    @Post("getMyMapPins")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMyMapPins(@Req() req): Promise<{ mapPins: MapPin[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	const mapPins: MapPin[] = await this.mapPinsService.findMapPinsByUserId(user.id)
    	console.log(`fetching ${mapPins.length} pins for user ${user.id}`)
    	return { mapPins }
    }

    @Post("joinPin")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async joinPin(@Req() req, @Body() {mapPinId}): Promise<{ success: boolean }> {
    	const user: User = await this.getUserFromRequest(req)
    	console.log(`joining pin for user ${user.id} and mapPin ${mapPinId}`)
    	const mapPin: MapPin = await this.mapPinsService.findMapPinById(mapPinId)
    	if (!mapPin) {
        	throw new BadRequestException("Pin not found")
    	}
    	const map: PinUserMap = await this.mapPinsService.createPinUserMap(mapPinId, user.id)
    	await this.mapPinsService.updateMapPinUsersCount(mapPinId, mapPin.usersCount + 1)
    	console.log("Map created", map)
    	return { success: map !== null }
    }

    @Post("leavePin")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async leavePin(@Req() req, @Body() {mapPinId}): Promise<{ success: boolean }> {
    	const user: User = await this.getUserFromRequest(req)
    	console.log(`leaving pin for user ${user.id} and mapPin ${mapPinId}`)
    	const mapPin: MapPin = await this.mapPinsService.findMapPinById(mapPinId)
    	if (!mapPin) {
        	throw new BadRequestException("Pin not found")
    	}
    	await this.mapPinsService.deletePinUserMap(mapPinId, user.id)
    	if(mapPin.usersCount === 1) {
    		await this.mapPinsService.deletePin(mapPinId)
    	} else {
    		await this.mapPinsService.updateMapPinUsersCount(mapPinId, mapPin.usersCount - 1)
    	}
    	return { success: true }
    }

    @Post("createPinAndJoin")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async createPinAndJoin(@Req() req, @Body() appLocation: IAppLocation): Promise<{ mapPin: MapPin }> {
    	const user: User = await this.getUserFromRequest(req)
    	console.log(`creating pin for user ${user.id} and mapPin ${appLocation}`)
    	const mapPin: MapPin = await this.mapPinsService.createMapPin({
    		...appLocation,
    		usersCount: 1
    	})
    	console.log(`created pin ${mapPin}`)
    	const map: PinUserMap = await this.mapPinsService.createPinUserMap(mapPin.id, user.id)
    	console.log(`created map ${map}`)
    	return { mapPin }
    }
}