import { IsNotEmpty, IsPhoneNumber, IsEnum, IsEmail} from 'class-validator'
import { TypeServices } from 'src/models/request.entity'

export class RequestDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    whatYouDo: string

    @IsPhoneNumber()
    phone: string

    @IsNotEmpty()
    companyName: string

    @IsNotEmpty()
    @IsEnum(TypeServices)
    typeService: TypeServices

    @IsNotEmpty()
    @IsEmail()
    email: string
}