import { Request } from "src/models/request.entity";

export const requestProviders = [
    {
        provide: 'REQUEST_REPOSITORY',
        useValue: Request
    }
]