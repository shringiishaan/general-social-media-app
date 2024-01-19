import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	UploadedFile,
	UseGuards,
	UseInterceptors,
	HttpCode,
	HttpStatus
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { profileImageMulterOptions } from "multer.config"
import { ImagesService } from "src/images/images.service"
import { AwsS3Service } from "src/aws-s3/aws-s3.service"
import { JwtAuthGuard } from "src/users/users-auth/jwt.strategy"
import { Image } from "src/images/image.entity"
import { UsersService } from "src/users/users.service"
import { User } from "src/users/user.entity"
import { IndustryService } from "./industry.service"
import { JobRoleService } from "./job-role.service"
import { Industry } from "./industry.entity"
import { JobRole } from "./job-role.entity"
import { UserCareerService } from "./user-career.service"
import { UserCareer } from "./user-career.entity"
import { ValidationError, validate } from "class-validator"
import { CreateUserCareerDto } from "./create-user-career.dto"
import { CreateIndustryDto } from "./create-industry.dto"
import { CreateJobRoleDto } from "./create-job-role.dto"

@Controller("userCareer")
export class UserCareerController {

	constructor(
        private readonly usersService: UsersService,
        private readonly industryService: IndustryService,
        private readonly jobRoleService: JobRoleService,
        private readonly userCareerService: UserCareerService,
	) { }

	private async _validateEntity(entity: any): Promise<void> {
		const errors = await validate(entity)
		if (errors.length) {
			throw new BadRequestException(errors.map(error => error.toString()).join(", "))
		}
	}

	private async getUserFromRequest(req: any): Promise<User> {
		const userId: number = req.user
		const user: User = await this.usersService.findById(userId)
		if (!user) {
			throw new BadRequestException("User not found")
		}
		return user
	}

    /**
     * ADMIN Industry
     */
    @Post("adminGetAllIndustries")
	async adminGetAllLanguages(): Promise<{ industries: Industry[] }> {
		return { industries: await this.industryService.findAllIndustries() }
	}

    @Post("adminCreateIndustry")
    async adminCreateIndustry(@Body() newIndustry: CreateIndustryDto): Promise<Industry> {
    	const errors: ValidationError[] = await validate(newIndustry)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	return this.industryService.createIndustry(newIndustry)
    }

    @Post("adminCreateIndustries")
    async adminCreateIndustries(@Body() newIndustries: CreateIndustryDto[]): Promise<Industry[]> {
    	const errors: ValidationError[] = await validate(newIndustries)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	return this.industryService.createIndustries(newIndustries)
    }

    @Post("adminUpdateIndustry")
    async adminUpdateIndustry(@Body() {industryId, industryName, priority}): Promise<{affected?: number}> {
    	return this.industryService.updateIndustry(industryId, industryName, priority)
    }

    @Post("adminDeleteIndustry")
    async adminDeleteIndustry(@Body() {industryId}): Promise<{affected?: number}> {
    	await this.jobRoleService.deleteJobRole(industryId)
    	return this.industryService.deleteIndustry(industryId)
    }

    /**
     * ADMIN Job Roles
     */
    @Post("adminGetAllJobRoles")
    async adminGetAllJobRoles(@Body() body: any): Promise<{ jobRoles: JobRole[] }> {
    	return { jobRoles: await this.jobRoleService.findAllJobRoles() }
    }

    @Post("adminCreateJobRole")
    async adminCreateJobRole(@Body() {jobRoleName, industryId, priority}): Promise<JobRole> {
    	return this.jobRoleService.createjobRole({ name: jobRoleName, priority })
    }

    @Post("adminCreateJobRoles")
    async adminCreateJobRoles(@Body() newJobRoles: CreateJobRoleDto[]): Promise<JobRole[]> {
    	const errors: ValidationError[] = await validate(newJobRoles)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	return this.jobRoleService.createjobRoles(newJobRoles)
    }

    @Post("adminUpdateJobRole")
    async adminUpdateJobRole(@Body() {jobRoleId, jobRoleName, priority}): Promise<{affected?: number}> {
    	return this.jobRoleService.updateJobRole(jobRoleId, jobRoleName, priority)
    }

    @Post("adminDeleteJobRole")
    async adminDeleteJobRole(@Body() {jobRoleId}): Promise<{affected?: number}> {
    	return this.jobRoleService.deleteJobRole(jobRoleId)
    }

    /**
     * Industries
     */
    @Post("getAllIndustries")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllIndustries(): Promise<{ industries: Industry[] }> {
    	return { industries: await this.industryService.findAllIndustries() }
    }

    /**
     * Job Roles
     */
    @Post("getAllJobRoles")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAllJobRoles(): Promise<{ jobRoles: JobRole[] }> {
    	return { jobRoles: await this.jobRoleService.findAllJobRoles() }
    }

    /**
     * User Careers
     */

    @Post("getMyCareers")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getMyCareers(@Req() req): Promise<{ myCareers: (UserCareer & {jobRole: string; industry: string})[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	const myCareers: UserCareer[] = await this.userCareerService.findAllUserCareerByUserId(user.id)
    	const uniqueJobRoleIds: number[] = [...new Set(myCareers.map(c => c.jobRoleId))]
    	const jobRoles: JobRole[] = await this.jobRoleService.findAllJobRolesByIds(uniqueJobRoleIds)
    	const uniqueIndustryIds: number[] = [...new Set(myCareers.map(c => c.industryId))]
    	const industries: Industry[] = await this.industryService.findAllIndustriesByIds(uniqueIndustryIds)   
    	return {
    		myCareers: myCareers.map(c => ({
    			...c,
    			jobRole: jobRoles.find(j => j.id === c.jobRoleId).name,
    			industry: industries.find(i => i.id === c.industryId).name
    		}))
    	}
    }
    
    @Post("createMyCareers")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async createMyCareers(@Req() req,  @Body() newCareers: CreateUserCareerDto[]): Promise<{ myCareers: UserCareer[] }> {
    	const user: User = await this.getUserFromRequest(req)
    	if(!newCareers || !newCareers.length) {
    		throw new BadRequestException("No user careers provided")
    	}
    	newCareers.forEach(newCareer => newCareer.userId = user.id)
    	const errors: ValidationError[] = await validate(newCareers)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	return { myCareers: await this.userCareerService.createUserCareers(newCareers) }
    }

    @Post("updateMyCareers")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async updateMyCareers(@Req() req,  @Body() newCareers: CreateUserCareerDto[]): Promise<{ success: boolean }> {
    	const user: User = await this.getUserFromRequest(req)
    	if(!newCareers || !newCareers.length) {
    		throw new BadRequestException("No user careers provided")
    	}
    	newCareers.forEach(newCareer => newCareer.userId = user.id)
    	const errors: ValidationError[] = await validate(newCareers)
    	if (errors.length) {
    		throw new BadRequestException(errors.map(error => error.toString()).join(", "))
    	}
    	await this.userCareerService.deleteAllUserCareersByUserId(user.id)
    	return { success: Boolean(await this.userCareerService.createUserCareers(newCareers)) }
    }

    @Post("deleteMyCareerById")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteMyCareerById(@Req() req,  @Body() { careerId }): Promise<{ success: boolean }> {
    	const user: User = await this.getUserFromRequest(req)
    	if(!careerId) {
    		throw new BadRequestException("No user careers provided")
    	}
    	const { affected } = await this.userCareerService.deleteUserCareerById(user.id, careerId)
    	return { 
    		success: affected > 0
    	}
    }

    @Post("deleteMyCareers")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async deleteMyCareers(@Req() req): Promise<{success: boolean}> {
    	const user: User = await this.getUserFromRequest(req)
    	return { success: (await this.userCareerService.deleteAllUserCareersByUserId(user.id)).affected > 0 }
    }
}