import { Injectable } from '@nestjs/common';
import { DeleteObjectCommand, DeleteObjectCommandInput, GetObjectCommand, GetObjectCommandInput, GetObjectCommandOutput, PutObjectCommand, PutObjectCommandInput, S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import * as fs from 'fs-extra'
import * as path from 'path'

@Injectable()
export class AwsS3Service {

    constructor(
    ) { }

    async downloadAndStream(storageKey: string, res: Response): Promise<void> {
        const input: GetObjectCommandInput = {
            Bucket: `${process.env.S3_DIRECTORY_NAME}`,
            Key: storageKey,
        }
        const request: S3ClientConfig = {
            endpoint: process.env.S3_ENDPOINT,
            forcePathStyle: true,
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SPACES_SECRET
            },
        }
        const getCommand: GetObjectCommand = new GetObjectCommand(input)
        const s3Client: S3Client = new S3Client(request)
        const response: GetObjectCommandOutput = await s3Client.send(getCommand)
        //@ts-ignore
        response.Body.pipe(res)
    }

    async uploadMulterToStorage(multerFileId: string, storageKey: string, ownerUserId: number): Promise<void> {
        const currentFilePath: string = path.join(process.env.MULTER_UPLOADS_TEMP_DIR, multerFileId)
        const readStream: fs.ReadStream = fs.createReadStream(currentFilePath)
        const client: S3Client = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            forcePathStyle: true,
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SPACES_SECRET
            },
        })
        const commandInput: PutObjectCommandInput = {
            Bucket: `${process.env.S3_DIRECTORY_NAME}`,
            Key: storageKey,
            Body: readStream,
            ACL: "public-read",
            Metadata: {
                "owner-id": ownerUserId.toString(),
            }
        }
        const uploadCommand: PutObjectCommand = new PutObjectCommand(commandInput)
        await client.send(uploadCommand)
        readStream.close()
        await fs.unlink(currentFilePath)
    }

    async deleteFromStorage(storageKey: string): Promise<void> {
        const client: S3Client = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            forcePathStyle: true,
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID,
                secretAccessKey: process.env.SPACES_SECRET
            },
        })
        const commandInput: DeleteObjectCommandInput = {
            Bucket: `${process.env.S3_DIRECTORY_NAME}`,
            Key: storageKey,
        }
        const deleteCommand: DeleteObjectCommand = new DeleteObjectCommand(commandInput)
        await client.send(deleteCommand)
    }
}