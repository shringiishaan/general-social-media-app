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

export class CreateUserCareerDto {

    @IsNumber()
    @IsNotEmpty()
    	userId: number

    @IsNumber()
    @IsNotEmpty()
    	industryId: number

    @IsNumber()
    @IsNotEmpty()
    	jobRoleId: number

    @IsNumber()
    	year?: number

    @IsNumber()
    @IsNotEmpty()
    	priority: number
}
