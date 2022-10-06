import { Body, Controller, forwardRef, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Feedback } from "src/models/feedback.entity";
import { RatingValidation } from "src/pipes/ratingValidation.pipe";
import { FeedbackService } from "./feedback.service";

@Controller('/feedback')
export class FeedbackController {
    constructor(
        private readonly feedbackService: FeedbackService,
    ) {}

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number): Promise<Feedback> {
        const foundFeedback = await this.feedbackService.getOne(id)
        return foundFeedback
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body('rating', RatingValidation) rating: number,
        @Body('text') text: string,
        @Body('partnerId', ParseIntPipe) partnerId: number
    ) {
        const createdFeedback = await this.feedbackService.create({ rating, text, partnerId })
        return createdFeedback
    }
}