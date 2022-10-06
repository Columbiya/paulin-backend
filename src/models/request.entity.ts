import { IsPhoneNumber, IsEmail } from 'class-validator'
import { AllowNull, Column, Model, Table } from "sequelize-typescript";

export enum TypeServices {
    IT = 'IT',
    Crypto = 'Crypto',
    Sell = 'Sell'
}

@Table
export class Request extends Model {
    @AllowNull(false)
    @Column
    typeService: TypeServices.IT | TypeServices.Crypto | TypeServices.Sell

    @Column
    name: string

    @AllowNull(false)
    @Column
    whatYouDo: string

    @AllowNull(false)
    @Column
    phone: string

    @AllowNull(false)
    @Column
    companyName: string

    @Column
    email: string
}