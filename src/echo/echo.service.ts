import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class EchoService {
    constructor() {}

    async broadcast(message: string): Promise<void> {
        await axios.get(`https://alarmerbot.ru/?key=${process.env.API_KEY}&message=${message}`)
    }
}