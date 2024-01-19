import { Injectable } from "@nestjs/common"
import { Pop } from "./pop.entity"
import { InjectRepository } from "@nestjs/typeorm"
import { EntityManager, In, Repository, Transaction } from "typeorm"
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { User } from "src/users/user.entity"

@Injectable()
export class PopsService {

	constructor(
        @InjectRepository(Pop) private readonly popRepository: Repository<Pop>,
	) { }

	async createNewPop(createNewPopDto: CreateNewPopDto, owner: User): Promise<Pop> {
		if(!owner) {
			throw new Error("User (owner) not found")
		}
		const newPop = this.popRepository.create(createNewPopDto)
		newPop.owner = owner
		return await this.popRepository.save(newPop)
	}

	// Find Pop by ID
	async findPopById(popId: number): Promise<Pop> {
		return await this.popRepository.findOne({ where: { id: popId }, relations: ["owner"] })
	}

	// Get All Pops
	async getAllPops(): Promise<Pop[]> {
		return await this.popRepository.find({ 
			relations: ["owner"],
			order: {
				createTime: "DESC"
			}
		})	
	}

	// Update a Pop
	async updatePop(popId: number, updatePopDto: UpdatePopDto): Promise<Pop> {
		const pop = await this.popRepository.findOne({ where: { id: popId } })
		if (!pop) {
			throw new Error("Pop not found")
		}
		pop.text = updatePopDto.text
		return await this.popRepository.save(pop)
	}

	async deletePop(popId: number): Promise<void> {
		const pop = await this.popRepository.findOne({ where: { id: popId } })
		if (pop) {
			await this.popRepository.remove(pop)
		}
	}
}

export class CreateNewPopDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: "Pop text is too short" })
    @MaxLength(200, { message: "Pop text is too long" })
    	text: string
}


export class UpdatePopDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(10, { message: "Pop text is too short" })
    @MaxLength(200, { message: "Pop text is too long" })
    	text: string
}