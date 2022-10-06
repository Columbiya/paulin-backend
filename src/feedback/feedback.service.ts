import { BadRequestException, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Feedback } from "src/models/feedback.entity";
import { PartnersService } from "src/partners/partners.service";
import { FeedbackDto } from "./dto/feedback.dto";

@Injectable()
export class FeedbackService {
    constructor(
        @Inject('FEEDBACK_REPOSITORY') private feedbackRepository: typeof Feedback,
        @Inject(forwardRef(() => PartnersService))
        private readonly partnersService: PartnersService
    ) {}

    async getOne(id: number): Promise<Feedback> {
        return this.feedbackRepository.findOne({where: { id }})
    }

    async create({ text, rating, partnerId }: FeedbackDto): Promise<Feedback> {
        const foundPartner = await this.partnersService.getOne(partnerId)

        if (!foundPartner) {
            throw new BadRequestException('no partner found with the specified id')
        }

        if (foundPartner.partnersFeedback) {
            const feedback = await this.feedbackRepository.findOne({where: { id: foundPartner.partnersFeedback }})
            await feedback.destroy()
        }

        const createdFeedback = await this.feedbackRepository.create({ text, rating, partnerId })

        foundPartner.partnersFeedback = createdFeedback.id
        await foundPartner.save()

        return createdFeedback
    }

    async deleteFeedback(id: number): Promise<Feedback> {
        const foundFeedback = await this.feedbackRepository.findByPk(id)
        await foundFeedback.destroy()
        return foundFeedback
    }
}