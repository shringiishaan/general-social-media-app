import { Injectable } from '@nestjs/common';
import { Image } from './image.entity';
import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {

    constructor(
        @InjectRepository(Image) private readonly imageRepository: Repository<Image>,
    ) { }

    async create(sequenceNumber: number = 0): Promise<Image> {
        return this.imageRepository.save({
            sequenceNumber,
            createTime: moment().valueOf()
        })
    }

    async findAll(): Promise<Image[]> {
        return this.imageRepository.find()
    }

    async findById(imageId: number): Promise<Image> {
        return this.imageRepository.findOneBy({ id: imageId })
    }

    async delete(imageId: number): Promise<{ affected?: number }> {
        return this.imageRepository.delete(imageId)
    }
}