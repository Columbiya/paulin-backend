import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Partner } from "src/models/partner.entity";
import { PartnerDto } from "./dto/partner.dto";
import { PartnersService } from "./partners.service";
import { diskStorage } from 'multer'
import * as path from 'path'
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('/partners')
export class PartnersController {
    constructor(
        private readonly partnersService: PartnersService,
    ) {}

    @Get()
    async getAll(): Promise<Partner[]> {
        const partners = await this.partnersService.getAll()
        return partners
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Partner> {
        const foundPartner = await this.partnersService.getOne(id)
        return foundPartner
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('logo'))
    async create(
        @Body() partner: PartnerDto,
        @UploadedFile() image: Express.Multer.File
    ): Promise<Partner> {
        const createdPartner = await this.partnersService.create({ ...partner, image })
        return createdPartner
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @UseInterceptors(FileInterceptor('logo'))
    async editOne(
        @Param('id', ParseIntPipe) id: number,
        @Body() resultPartner: PartnerDto & {id: number},
        @UploadedFile() image: Express.Multer.File
    ): Promise<Partner> {
        const editedPartner = await this.partnersService.edit(resultPartner, id, image)
        return editedPartner
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePartner(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Partner> {
        const deletedPartner = await this.partnersService.delete(id)
        return deletedPartner
    }
}