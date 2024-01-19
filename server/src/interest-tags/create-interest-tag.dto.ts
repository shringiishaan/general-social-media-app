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

export class CreateInterestTagDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "name is too short" })
    @MaxLength(200, { message: "name is too long" })
    	name: string

    @IsNumber()
    @IsNotEmpty()
    	categoryId: number

    @IsNumber()
    @IsNotEmpty()
    	priority: number
}
