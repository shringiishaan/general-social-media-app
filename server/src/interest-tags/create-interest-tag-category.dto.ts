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

export class CreateInterestTagCategoryDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "name is too short" })
    @MaxLength(100, { message: "name is too long" })
    	name: string
    
    @IsNumber()
    @IsNotEmpty()
    	priority: number
}
