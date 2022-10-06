import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(
        @Body('username') username: string,
        @Body('password') password: string
    ): Promise<string> {
        const token = await this.authService.login(username, password)
        return token
    }
}