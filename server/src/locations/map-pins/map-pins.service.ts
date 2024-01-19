import { Injectable } from "@nestjs/common"
import { MapPin } from "./map-pin.entity"
import * as moment from "moment"
import { InjectRepository } from "@nestjs/typeorm"
import { And, In, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm"
import { CreateMapPinDto } from "./create-map-pin.dto"
import { PinUserMap } from "./pin-user-map.entity"
import { UsersService } from "src/users/users.service"
import { User } from "src/users/user.entity"

@Injectable()
export class MapPinsService {

	constructor(
        @InjectRepository(MapPin) private readonly mapPinRepository: Repository<MapPin>,
        @InjectRepository(PinUserMap) private readonly pinUserMapRepository: Repository<PinUserMap>,
        private readonly usersService: UsersService,
	) { }

	async createMapPin(createMapPinDto: CreateMapPinDto): Promise<MapPin> {
		return this.mapPinRepository.save({ 
			...createMapPinDto,
			createTime: new Date()
		})
	}

	async createMapPins(createMapPinDto: CreateMapPinDto[]): Promise<MapPin[]> {
		return this.mapPinRepository.save(createMapPinDto.map(pin => ({
			...pin,
			createTime: new Date()
		})))
	}

	async createPinUserMap(mapPinId: number, userId: number): Promise<PinUserMap> {
		return this.pinUserMapRepository.save({
			mapPinId,
			userId,
			createTime: new Date()
		})
	}

	async findAllMapPins(): Promise<MapPin[]> {
		return this.mapPinRepository.find()
	}

	async findMapPinById(mapPinId: number): Promise<MapPin> {
		return this.mapPinRepository.findOneBy({ id: mapPinId })
	}

	async findMapPinsByUserId(userId: number): Promise<MapPin[]> {
		const pinUserMaps: PinUserMap[] = await this.pinUserMapRepository.findBy({ userId })
		const mapPinIds: number[] = pinUserMaps.map(pinUserMap => pinUserMap.mapPinId)
		if(!mapPinIds || mapPinIds.length === 0) {
			return []
		}
		return this.mapPinRepository.findBy({ id: In(mapPinIds) })
	}

	async findMapPinsByLocationArea(minLat: number, maxLat: number, minLng: number, maxLng: number): Promise<MapPin[]> {
		return this.mapPinRepository.findBy({
			latitude: And(MoreThanOrEqual(minLat), LessThanOrEqual(maxLat)),
			longitude: And(MoreThanOrEqual(minLng), LessThanOrEqual(maxLng)),
		})
	}
	async findAllUsersByMapPinId(mapPinId: number): Promise<User[]> {
		const pinUserMaps: PinUserMap[] = await this.pinUserMapRepository.findBy({ mapPinId })
		const userIds: number[] = pinUserMaps.map(pinUserMap => pinUserMap.userId)
		if(!userIds || userIds.length === 0) {
			return []
		}
		const users: User[] = await this.usersService.findUsersByUserIds(userIds)
		return users
	}

	async updateMapPinLocation(mapPinId: number, latitude: number, longitude: number): Promise<void> {
		await this.mapPinRepository.update(mapPinId, {
			latitude,
			longitude,
		})
	}

	async updateMapPinUsersCount(mapPinId: number, usersCount: number): Promise<void> {
		await this.mapPinRepository.update(mapPinId, {
			usersCount
		})
	}

	async updateMapPinName(mapPinId: number, name: string): Promise<void> {
		await this.mapPinRepository.update(mapPinId, {
			name
		})
	}

	async deletePin(mapPinId: number): Promise<{ affected?: number }> {
		await this.pinUserMapRepository.delete({ mapPinId })
		return this.mapPinRepository.delete(mapPinId)
	}

	async deletePinUserMap(mapPinId: number, userId: number): Promise<{ affected?: number }> {
		return this.pinUserMapRepository.delete({ mapPinId, userId })
	}

	async deleteAllPinUserMapsByMapPinId(mapPinId: number): Promise<{ affected?: number }> {
		return this.pinUserMapRepository.delete({ mapPinId })
	}

	async deleteAllPinUserMapsByUserId(userId: number): Promise<{ affected?: number }> {
    	return this.pinUserMapRepository.delete({ userId })
	}
}