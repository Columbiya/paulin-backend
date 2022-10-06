import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Request } from "src/models/request.entity";
import { RequestDto } from "./dto/request.dto";
import { RequestService } from "./request.service";

@Controller('/requests')
export class RequestController {
    constructor(
        private readonly requestService: RequestService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
        const foundRequests = await this.requestService.getAll()
        return foundRequests
    }

    @Post()
    async create(
        @Body() request: RequestDto
    ): Promise<Request> {
        const createdRequest = await this.requestService.create(request)
        return createdRequest
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<Request> {
        const deletedRequest = await this.requestService.delete(id)
        return deletedRequest
    }
}