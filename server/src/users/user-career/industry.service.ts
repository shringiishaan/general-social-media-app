import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { Industry } from "./industry.entity"
import { CreateIndustryDto } from "./create-industry.dto"

@Injectable()
export class IndustryService {

	constructor(
        @InjectRepository(Industry) private readonly industryRepository: Repository<Industry>,
	) { }

	async createIndustry(newIndustryDto: CreateIndustryDto): Promise<Industry> {
		return this.industryRepository.save({ 
			...newIndustryDto,
			createTime: new Date()
		})
	}

	async createIndustries(newIndustryDtos: CreateIndustryDto[]): Promise<Industry[]> {
		const now: Date = new Date()
		return this.industryRepository.save(newIndustryDtos.map(dto => ({
			...dto,
			createTime: now
		})))
	}

	async findAllIndustriesByIds(industryIds: number[]): Promise<Industry[]> {
		return this.industryRepository.find({
			where: {
				id: In(industryIds)
			}
		})
	}

	async findAllIndustries(): Promise<Industry[]> {
		return this.industryRepository.find()
	}

	async updateIndustry(industryId: number, industryName: string, priority: number): Promise<{affected?: number}> {
		return this.industryRepository.update(industryId , { 
			name: industryName,
			priority,
		})
	}

	async deleteIndustry(industryId: number): Promise<{affected?: number}> {
		return this.industryRepository.delete({ id: industryId })
	}

	async deleteAllIndustries(): Promise<{affected?: number}> {
		return this.industryRepository.delete({})
	}
}