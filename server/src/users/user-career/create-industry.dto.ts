import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsString,
	Length,
	MaxLength,
	MinLength,
} from "class-validator"

export class CreateIndustryDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "Industry name is too short" })
    @MaxLength(200, { message: "Industry name is too long" })
    	name: string

    @IsNumber()
    @IsNotEmpty()
    	priority: number
}
