import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UserCareer } from "./user-career.entity"
import { CreateUserCareerDto } from "./create-user-career.dto"
import { ValidationError, validate } from "class-validator"

@Injectable()
export class UserCareerService {

	constructor(
        @InjectRepository(UserCareer) private readonly userCareerRepository: Repository<UserCareer>,
	) { }

	async createUserCareer(newCreateUserCareerDto: CreateUserCareerDto): Promise<UserCareer> {
		return this.userCareerRepository.save({ 
			...newCreateUserCareerDto,
			createTime: new Date()
		})
	}

	async createUserCareers(newCreateUserCareerDtos: CreateUserCareerDto[]): Promise<UserCareer[]> {
		return this.userCareerRepository.save(newCreateUserCareerDtos.map(dto => ({ 
			...dto,
			createTime: new Date()
		})))
	}

	async findAllUserCareerByUserId(userId: number): Promise<UserCareer[]> {
		return this.userCareerRepository.findBy({userId})
	}

	async updateUserCareer(userCareerId: number, industryId: number, jobRoleId: number, priority: number, year?: number): Promise<{affected?: number}> {
		return this.userCareerRepository.update(userCareerId , { 
			industryId,
			jobRoleId,
			priority,
			year
		})
	}

	async deleteAllUserCareersByUserId(userId: number): Promise<{affected?: number}> {
		return this.userCareerRepository.delete({ userId })
	}

	async deleteUserCareerById(userId: number, userCareerId: number): Promise<{affected?: number}> {
		return this.userCareerRepository.delete({ id: userCareerId, userId })
	}

	async deleteAllUserCareersByIndustryId(industryId: number): Promise<{affected?: number}> {
		return this.userCareerRepository.delete({ industryId })
	}

	async deleteAllUserCareersByJobRoleId(jobRoleId: number): Promise<{affected?: number}> {
		return this.userCareerRepository.delete({ jobRoleId })
	}
}