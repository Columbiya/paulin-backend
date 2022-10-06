import { Module } from "@nestjs/common";
import { RequestController } from "./request.controller";
import { requestProviders } from "./request.providers";
import { RequestService } from "./request.service";

@Module({
    controllers: [RequestController],
    providers: [
        ...requestProviders,
        RequestService
    ]
})
export class RequestModule {}