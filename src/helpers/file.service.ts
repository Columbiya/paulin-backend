import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class FileService {
    constructor() {}

    async writeFile(file: Express.Multer.File): Promise<string> {
        try {
            const fileExtenshion = path.extname(file.originalname)
            const fileName = uuidv4() + fileExtenshion
            const filePath = path.resolve(__dirname, '..', 'public')
    
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
    
            if (!file) {
                return null
            }
    
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return fileName
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 

    deleteFile(fileName: string): void {
        fs.unlink(path.resolve(__dirname, '..', '..', 'dist', 'public', fileName), (err) => {
            if (err) console.log(err)
        })
    }
}