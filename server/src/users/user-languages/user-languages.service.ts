import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { CreateUserLanguageMapDto, UserLanguageMap } from "./user-language-map.entity"
import { CreateLanguageDto, Language } from "./language.entity"

@Injectable()
export class UserLanguagesService {

	constructor(
        @InjectRepository(Language) private readonly languageRepository: Repository<Language>,
        @InjectRepository(UserLanguageMap) private readonly userLanguageMapRepository: Repository<UserLanguageMap>,
	) { }

	async createNewLanguage(newLanguageDto: CreateLanguageDto): Promise<Language> {
		return this.languageRepository.save({ 
			...newLanguageDto,
			createTime: new Date()
		})
	}

	async createNewLanguages(newLanguageDtos: CreateLanguageDto[]): Promise<Language[]> {
		return this.languageRepository.save(newLanguageDtos.map(newLanguageDto => ({
			...newLanguageDto,
			createTime: new Date()
		})))
	}

	async createNewUserLanguageMap(newUserLanguageMap: CreateUserLanguageMapDto): Promise<UserLanguageMap> {
		return this.userLanguageMapRepository.save({ 
			...newUserLanguageMap,
			createTime: new Date()
		})
	}

	async findAllLanguages(): Promise<Language[]> {
		return this.languageRepository.find()
	}

	async findAllLanguagesByIds(languageIds: number[]): Promise<Language[]> {
		return this.languageRepository.findBy({ id: In(languageIds) })
	}                   

	async findAllLanguagesByUserId(userId: number): Promise<Language[]> {
		const userLanguageMaps: UserLanguageMap[] = await this.userLanguageMapRepository.findBy({ userId })
		const languageIds: number[] = userLanguageMaps.map((userLanguageMap: UserLanguageMap) => userLanguageMap.languageId)
		return this.languageRepository.findBy({ id: In(languageIds) })
	}

	async updateUserAllLanguageMaps(updatedUserLanguageMaps: CreateUserLanguageMapDto[]): Promise<UserLanguageMap[]> {
		const deleteUserLanguageMaps: UserLanguageMap[] = await this.userLanguageMapRepository.findBy({ userId: updatedUserLanguageMaps[0].userId })
		const deleteLanguageIds: number[] = deleteUserLanguageMaps.map(deleteUserLanguageMap => deleteUserLanguageMap.id)
		if(deleteLanguageIds && deleteLanguageIds.length) {
		    await this.userLanguageMapRepository.delete(deleteLanguageIds)
		}
		return this.userLanguageMapRepository.save(updatedUserLanguageMaps.map(updatedUserLanguageMap => ({
			...updatedUserLanguageMap,
        	updateTime: new Date()
		})))
	}

	async deleteLanguage(languageId: number): Promise<{affected?: number}> {
		return this.languageRepository.delete({ id: languageId })
	}

	async deleteUserLanguageMap(userId: number, languageId: number): Promise<{affected?: number}> {
		return this.userLanguageMapRepository.delete({ userId, languageId })
	}

	async deleteUserAllLanguageMaps(userId: number): Promise<{affected?: number}> {
		return this.userLanguageMapRepository.delete({ userId })
	}

	async deleteAllLanguages(): Promise<{affected?: number}> {
		return this.userLanguageMapRepository.delete({ })
	}
}