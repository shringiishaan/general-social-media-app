import { Module } from '@nestjs/common';
import { Image } from './image.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Image]),
        AwsS3Module
    ],
    controllers: [
        ImagesController
    ],
    providers: [
        ImagesService
    ],
    exports: [
        ImagesService
    ]
})

export class ImagesModule { }