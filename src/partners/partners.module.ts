import { forwardRef, Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { FeedbackModule } from "src/feedback/feedback.module";
import { FileService } from "src/helpers/file.service";
import { PartnersController } from "./partners.controller";
import { partnersProviders } from "./partners.providers";
import { PartnersService } from "./partners.service";

@Module({
  imports: [DatabaseModule, forwardRef(() => FeedbackModule)],
  controllers: [PartnersController],
  providers: [
    PartnersService,
    ...partnersProviders,
    FileService
  ],
  exports: [PartnersService]
})
export class PartnersModule {}