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

export class CreateJobRoleDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "Job Role name is too short" })
    @MaxLength(200, { message: "Job Role name is too long" })
    	name: string

    @IsNumber()
    @IsNotEmpty()
    	priority: number
}
