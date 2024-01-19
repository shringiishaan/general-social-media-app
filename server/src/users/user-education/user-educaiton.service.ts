import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { CreateEducationDto, UserEducation } from "./user-education.entity"

@Injectable()
export class UserEducationService {

	constructor(
        @InjectRepository(UserEducation) private readonly userEducationRepository: Repository<UserEducation>,
	) { }

	async createNewUserEducation(createEducationDto: CreateEducationDto): Promise<UserEducation> {
		return this.userEducationRepository.save({ 
			...createEducationDto,
			createTime: new Date()
		})
	}

	async createNewUserEducations(createEducationDtos: CreateEducationDto[]): Promise<UserEducation[]> {
		return this.userEducationRepository.save(createEducationDtos.map(createEducationDto => ({
			...createEducationDto,
			createTime: new Date()
		})))
	}

	async findAllUserEducationByUserId(userId: number): Promise<UserEducation[]> {
		return (await this.userEducationRepository.find({ 
			where: { userId },
			order: { priority: "DESC" }
		}))
	}

	async updateUserEducationById(userEducationId: number, college?: string, course?: string, graduationYear?: string): Promise<{affected?: number}> {
		return this.userEducationRepository.update(userEducationId , { 
			college, 
			course,
			graduationYear,
		})
	}

	async deleteUserEducationById(userEducationId: number): Promise<{affected?: number}> {
		return this.userEducationRepository.delete(userEducationId)
	}

	async deleteAllUserEducationsByUserId(userId: number): Promise<{affected?: number}> {
		return this.userEducationRepository.delete({ userId })
	}
}