import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { JobRole } from "./job-role.entity"
import { CreateJobRoleDto } from "./create-job-role.dto"

@Injectable()
export class JobRoleService {

	constructor(
        @InjectRepository(JobRole) private readonly jobRoleRepository: Repository<JobRole>,
	) { }

	async createjobRole(newCreateJobRoleDto: CreateJobRoleDto): Promise<JobRole> {
		return this.jobRoleRepository.save({ 
			...newCreateJobRoleDto,
			createTime: new Date()
		})
	}

	async createjobRoles(newCreateJobRoleDtos: CreateJobRoleDto[]): Promise<JobRole[]> {
		const now: Date = new Date()
		return this.jobRoleRepository.save(newCreateJobRoleDtos.map(newCreateJobRoleDto => ({
			...newCreateJobRoleDto,
			createTime: now
		})))
	}

	async findAllJobRoles(): Promise<JobRole[]> {
		return this.jobRoleRepository.find()
	}

	async findAllJobRolesByIds(jobRoleIds: number[]): Promise<JobRole[]> {
		return this.jobRoleRepository.find({
			where: {
				id: In(jobRoleIds)
			}
		})
	}

	async updateJobRole(jobRoleId: number, jobRoleName: string, priority: number): Promise<{affected?: number}> {
		return this.jobRoleRepository.update(jobRoleId , { 
			name: jobRoleName,
			priority,
		})
	}

	async deleteJobRole(jobRoleId: number): Promise<{affected?: number}> {
		return this.jobRoleRepository.delete({ id: jobRoleId })
	}
}