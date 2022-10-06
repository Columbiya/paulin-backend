import { Partner } from "src/models/partner.entity";

export const partnersProviders = [
    {
        provide: 'PARTNERS_REPOSITORY',
        useValue: Partner
    }
]