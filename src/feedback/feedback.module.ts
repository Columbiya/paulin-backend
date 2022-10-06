import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { PartnersModule } from "src/partners/partners.module";
import { FeedbackController } from "./feedback.controller";
import { feedbackProviders } from "./feedback.providers";
import { FeedbackService } from "./feedback.service";

@Module({
    imports: [DatabaseModule, forwardRef(() => PartnersModule)],
    controllers: [FeedbackController],
    providers: [
        FeedbackService,
        ...feedbackProviders,
    ],
    exports: [FeedbackService]
})
export class FeedbackModule {}