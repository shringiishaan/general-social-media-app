import { Injectable } from "@nestjs/common"
import { CreateUserDto, User } from "./user.entity"
import * as moment from "moment"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"

@Injectable()
export class UsersService {

	constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
	) { }

	async create(createUserDto: CreateUserDto): Promise<User> {
		return this.userRepository.save({ 
			...createUserDto,
			createTime: new Date()
		})
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.find()
	}

	async findById(userId: number): Promise<User> {
		return this.userRepository.findOneBy({ id: userId })
	}

	async findUsersByUserIds(userIds: number[]): Promise<User[]> {
		return this.userRepository.findBy({ id: In(userIds) })
	}

	async checkUserPassword(phoneNumber: string, password: string): Promise<number> {
		const user: User = await this.userRepository.findOneBy({ phoneNumber })
		return (user.passwordHash === password) ? user.id : null
	}

	async findByPhoneNumber(phoneNumber: string): Promise<User> {
		return this.userRepository.findOneBy({ phoneNumber })
	}

	async checkUserIdExists(userId: number): Promise<boolean> {
		const [users, userCount] = await this.userRepository.findAndCountBy({ id: userId })
		return (userCount > 0)
	}

	async checkPhoneNumberExists(phoneNumber: string): Promise<boolean> {
		const [users, userCount] = await this.userRepository.findAndCountBy({ phoneNumber })
		return (userCount > 0)
	}

	async setAvatarImageId(userId: number, avatarImageId: number): Promise<{ affected?: number }> {
		return this.userRepository.update(userId, { avatarImageId })
	}

	async updateFirstName(userId: number, firstName: string): Promise<{ affected?: number }> {
		return this.userRepository.update(userId, { firstName })
	}

	async updateLastName(userId: number, lastName: string): Promise<{ affected?: number }> {
		return this.userRepository.update(userId, { lastName })
	}

	async delete(userId: number): Promise<{ affected?: number }> {
		return this.userRepository.delete(userId)
	}
}