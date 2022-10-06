import { Controller, Get, Query, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { EchoService } from "./echo.service";

@Controller('/echo')
export class EchoController {
    constructor(private readonly echoService: EchoService) {}

    @Get()
    async broadcast(
        @Query('message') message: string,
        @Request() req
    ): Promise<void> {
        console.log(req.user)
        await this.echoService.broadcast(message)
    }
}