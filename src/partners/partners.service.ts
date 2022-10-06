import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { FeedbackService } from "src/feedback/feedback.service";
import { FileService } from "src/helpers/file.service";
import { Feedback } from "src/models/feedback.entity";
import { Partner } from "src/models/partner.entity";
import { PartnerDto } from "./dto/partner.dto";

@Injectable()
export class PartnersService {
    constructor(
        @Inject('PARTNERS_REPOSITORY') private partnersRepository: typeof Partner,
        @Inject(forwardRef(() => FeedbackService))
        private readonly feedbackService: FeedbackService,
        private readonly fileService: FileService
    ) {}

    async getAll(): Promise<Partner[]> {
        return this.partnersRepository.findAll<Partner>({include: [Feedback]})
    }

    async create(partner: PartnerDto & {image: Express.Multer.File}): Promise<Partner> {
        if (!partner.image) {
            throw new HttpException('no logo was provided', HttpStatus.BAD_REQUEST)
        }
        
        const fileName = await this.fileService.writeFile(partner.image)
        const createdPartner = await this.partnersRepository.create({...partner, logo: fileName})
        return createdPartner
    }

    async getOne(id: number): Promise<Partner> {
        const foundPartner = await this.partnersRepository.findOne<Partner>({where: { id }})
        return foundPartner
    }

    async edit(resultPartner: PartnerDto, id: number, image?: Express.Multer.File): Promise<Partner> {
        const foundPartner = await this.partnersRepository.findOne<Partner>({where: { id }})
        let fileName: string

        if (image) {
            this.fileService.deleteFile(foundPartner.logo)
            fileName = await this.fileService.writeFile(image)
        }

        if (!foundPartner) {
            throw new BadRequestException('no partner found with the specified id')
        }

        Object.keys(resultPartner).forEach(key => foundPartner[key] = resultPartner[key])
        foundPartner.logo = fileName
        await foundPartner.save()
        return foundPartner
    }

    async delete(id: number): Promise<Partner> {
        const foundPartner = await this.partnersRepository.findByPk<Partner>(id)

        if (!foundPartner) {
            throw new BadRequestException('no partner found with the specified id')
        }

        const deletedFeedback = await this.feedbackService.deleteFeedback(foundPartner.partnersFeedback)
        await foundPartner.destroy()

        return foundPartner
    }
}