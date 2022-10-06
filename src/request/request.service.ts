import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Request } from "src/models/request.entity";
import { RequestDto } from "./dto/request.dto";

@Injectable()
export class RequestService {
    constructor(
        @Inject('REQUEST_REPOSITORY')
        private readonly requestRepository: typeof Request
    ) {}

    async getAll(): Promise<Request[]> {
        return this.requestRepository.findAll<Request>()
    }

    async create(request: RequestDto) {
        return this.requestRepository.create({...request})
    }

    async delete(id: number) {
        const foundRequest = await this.requestRepository.findByPk(id)

        if (!foundRequest) {
            throw new HttpException('no requests found with the specified id', HttpStatus.BAD_REQUEST)
        }

        await foundRequest.destroy()
        return foundRequest
    }
}