import { BadRequestException, Controller, Get, Header, Param, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { Image } from './image.entity';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';

@Controller('images')
export class ImagesController {

    constructor(
        private readonly imagesService: ImagesService,
        private readonly awsS3Service: AwsS3Service,
    ) { }

    @Get(':imageId')
    @Header('content-type', 'application/octet-stream')
    async getImage(@Param('imageId') imageId: number, @Res() res: Response) {
        const image: Image = await this.imagesService.findById(imageId)
        if (!image) {
            throw new BadRequestException()
        }
        const storageKey: string = image.id.toString()
        this.awsS3Service.downloadAndStream(storageKey, res)
    }
}