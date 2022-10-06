import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}

    validateUser(username: string, pass: string): boolean {
        return username === process.env.USER_LOGIN && pass === process.env.USER_PASS
    }

    async login(username, password): Promise<string> {
        if (!this.validateUser(username, password)) {
            throw new HttpException('login failed', HttpStatus.FORBIDDEN)
        }

        const token = await this.sign({ username, id: Date.now() }).then(token => token.access_token)
        return token
    }

    async sign(user: {username: string, id: number}) {
        const payload = { username: user.username, id: user.id }

        return {
            access_token: this.jwtService.sign(payload, {secret: process.env.SECRET_KEY})
        }
    }
}