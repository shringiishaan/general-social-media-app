import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface"
import { DiskStorageOptions, diskStorage } from "multer"
import * as path from "path"

export const productImageMulterOptions: MulterOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.normalize(process.env.MULTER_UPLOADS_TEMP_DIR))
        }
    }),
    fileFilter: (req, file, cb) => {
        cb(null, true)
    },
    preservePath: false,
    limits: {
        fieldNameSize: undefined,
        fieldSize: undefined,
        fields: undefined,
        fileSize: 5 * 1024 * 1024,
        files: 5,
        parts: undefined,
        headerPairs: undefined,
    }
}

export const profileImageMulterOptions: MulterOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.normalize(process.env.MULTER_UPLOADS_TEMP_DIR))
        }
    }),
    fileFilter: (req, file, cb) => {
        cb(null, true)
    },
    preservePath: false,
    limits: {
        fieldNameSize: undefined,
        fieldSize: undefined,
        fields: undefined,
        fileSize: 5 * 1024 * 1024,
        files: 5,
        parts: undefined,
        headerPairs: undefined,
    }
}