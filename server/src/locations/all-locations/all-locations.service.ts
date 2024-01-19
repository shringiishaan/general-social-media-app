import { Injectable } from "@nestjs/common"
import * as moment from "moment"
import { GoogleLocationsService } from "../google-locations/google-locations.service"
import { MapPinsService } from "../map-pins/map-pins.service"
import { MapPin } from "../map-pins/map-pin.entity"
import { IAppLocation } from "src/interfaces"

@Injectable()
export class AllLocationsService {

	constructor(
        private readonly googleLocationsService: GoogleLocationsService,
        private readonly mapPinsService: MapPinsService
	) { }

	async getAllLocations(): Promise<IAppLocation[]> {
		const mapPins: MapPin[] = await this.mapPinsService.findAllMapPins()
		const mapPinsLocations: IAppLocation[] = mapPins.map(pin => ({
			name: pin.name,
			latitude: pin.latitude,
			longitude: pin.longitude,
			mapPin: {
				mapPinId: pin.id,
				usersCount: pin.usersCount,
			}
		}))
		const googleLocations: IAppLocation[] = await this.googleLocationsService.getAllLocations()
		const uniqueGoogleLocations: IAppLocation[] = googleLocations.filter(googleLocation => {
			const isUnique: boolean = !mapPinsLocations.find(mapPinLocation => mapPinLocation.name === googleLocation.name)
			return isUnique
		})
		const allLocations: IAppLocation[] = [...mapPinsLocations, ...uniqueGoogleLocations]
		return allLocations
	}
}