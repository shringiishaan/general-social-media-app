import { Injectable } from "@nestjs/common"
import * as moment from "moment"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { InterestTag } from "./interest-tag.entity"
import { InterestTagCategory } from "./interest-tag-category.entity"
import { CreateInterestTagDto } from "./create-interest-tag.dto"
import { CreateInterestTagCategoryDto } from "./create-interest-tag-category.dto"
import { IInterestTagsCollection } from "src/interfaces"
import { UserInterestTagsMap } from "./user-interest-tags-map.entity"

@Injectable()
export class InterestTagsService {

	constructor(
        @InjectRepository(InterestTag) private readonly interestTagRepository: Repository<InterestTag>,
        @InjectRepository(InterestTagCategory) private readonly interestTagCategoryRepository: Repository<InterestTagCategory>,
        @InjectRepository(UserInterestTagsMap) private readonly userInterestTagsMapRepository: Repository<UserInterestTagsMap>,
	) { }

	async createInterestTag(createInterestTagDto: CreateInterestTagDto): Promise<InterestTag> {
		return this.interestTagRepository.save({ 
			...createInterestTagDto,
			createTime: new Date()
		})
	}

	async createInterestTags(createInterestTagDtos: CreateInterestTagDto[]): Promise<InterestTag[]> {
		return this.interestTagRepository.save(createInterestTagDtos.map(dto => ({ 
			...dto,
			createTime: new Date()
		})))
	}

	async createInterestTagCategory(createInterestTagCategoryDto: CreateInterestTagCategoryDto): Promise<InterestTagCategory> {
		return this.interestTagCategoryRepository.save({ 
			...createInterestTagCategoryDto,
			createTime: new Date()
		})
	}

	async createInterestTagCategories(createInterestTagCategoryDtos: CreateInterestTagCategoryDto[]): Promise<InterestTagCategory[]> {
		return this.interestTagCategoryRepository.save(createInterestTagCategoryDtos.map(dto => ({ 
			...dto,
			priority: dto.priority || 0,
			createTime: new Date()
		})))
	}

	async getAllInterests(): Promise<IInterestTagsCollection[]> {
		const allInterestCategories: InterestTagCategory[] = await this.interestTagCategoryRepository.find()
		if(!allInterestCategories || allInterestCategories.length === 0) {
			return []
		}
		const allInterests: InterestTag[] = await this.interestTagRepository.find()
		const allInterestsCollection: IInterestTagsCollection[] = []
		allInterestCategories.forEach(category => {
			allInterestsCollection.push({
				category,
				interests: allInterests.filter(interest => interest.categoryId === category.id)
			})
		})
		return allInterestsCollection
	}

	async getInterestTagById(userInterestId: number): Promise<InterestTag> {
		const userInterest: InterestTag = await this.interestTagRepository.findOneBy({ id: userInterestId })
		return userInterest
	}

	async getInterestTagsCollectionById(interestTagCategoryId: number): Promise<IInterestTagsCollection> {
		const userInterestCategory: InterestTagCategory = await this.interestTagCategoryRepository.findOneBy({ id: interestTagCategoryId })
		const userInterests: InterestTag[] = await this.interestTagRepository.findBy({ categoryId: interestTagCategoryId })
		return { category: userInterestCategory, interests: userInterests }
	}

	async updateInterestTag(userInterestId: number, userInterestName: string): Promise<{ affected?: number }> {
		return this.interestTagRepository.update(userInterestId, { name: userInterestName })
	}

	async updateInterestTagCategory(interestTagCategoryId: number, userInterestCategoryName: string): Promise<{ affected?: number }> {
		return this.interestTagCategoryRepository.update(interestTagCategoryId, { name: userInterestCategoryName })
	}

	async deleteInterestTag(userInterestId: number): Promise<{ affected?: number }> {
		return this.interestTagRepository.delete(userInterestId)
	}

	async deleteInterestTagCategory(interestTagCategoryId: number): Promise<boolean> {
		await this.interestTagRepository.delete({ categoryId: interestTagCategoryId })
		return (await this.interestTagCategoryRepository.delete(interestTagCategoryId)).affected > 0
	}

	async getAllInterestsByUserId(userId: number): Promise<IInterestTagsCollection[]> {
		const userIndustryMaps: UserInterestTagsMap[] = await this.userInterestTagsMapRepository.findBy({userId})
		const allInterestCategories: InterestTagCategory[] = await this.interestTagCategoryRepository.find()
		const allInterests: InterestTag[] = await this.interestTagRepository.find()
		const myInterestsCollection: IInterestTagsCollection[] = []
		allInterestCategories.forEach(category => {
			const catInterests = allInterests.filter(interest => interest.categoryId === category.id)
			if(catInterests.length > 0) {
				const myCatInterests = catInterests.filter(interest => userIndustryMaps.find(map => map.userInterestId === interest.id))
				if(myCatInterests.length > 0) {
					myInterestsCollection.push({
						category,
						interests: myCatInterests
					})
				}
			}
		})
		return myInterestsCollection
	}

	async updateInterestTags(userId: number, interestCollections: IInterestTagsCollection[]): Promise<void> {
		const userInterestMaps: UserInterestTagsMap[] = await this.userInterestTagsMapRepository.findBy({userId})
		const myCurrentInterestTagIds: number[] = userInterestMaps.map(map => map.userInterestId)
		//delete old interests
		const deleteInterestTagMaps: UserInterestTagsMap[] = []
		userInterestMaps.forEach(map => {
			if(!interestCollections.find(collection => collection.interests.find(interest => interest.id === map.userInterestId))) {
				deleteInterestTagMaps.push(map)
			}
		})
		const deleteInterestTagMapIds: number[] = deleteInterestTagMaps.map(map => map.id)
		if(deleteInterestTagMapIds && deleteInterestTagMapIds.length > 0) {
			await this.userInterestTagsMapRepository.delete(deleteInterestTagMapIds)
		}
		//add new interests
		const newInterestTagIds: number[] = []
		interestCollections.forEach(collection => {
			collection.interests.forEach(interest => {
				if(!myCurrentInterestTagIds.includes(interest.id)) {
					newInterestTagIds.push(interest.id)
				}
			})
		})
		const newInterestTagMaps: Partial<UserInterestTagsMap>[] = newInterestTagIds.map(userInterestId => ({
			userId,
			userInterestId,
			createTime: new Date()
		}))
		if(newInterestTagMaps && newInterestTagMaps.length > 0) {
			await this.userInterestTagsMapRepository.save(newInterestTagMaps)
		}
	}           
}