import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class RatingValidation implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (isNaN(value) || value <= 0 || value > 5) {
            throw new BadRequestException('Rating should be a number from 0 to 5')
        }

        return value
    }
}