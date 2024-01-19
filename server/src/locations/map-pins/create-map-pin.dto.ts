import {
	IsDate,
	IsEnum,
	IsLatitude,
	IsLongitude,
	IsNotEmpty,
	IsNumber,
	IsString,
	Length,
	MaxLength,
	MinLength,
} from "class-validator"

export class CreateMapPinDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "First name is too short" })
    @MaxLength(100, { message: "First name is too long" })
    	name: string

    @IsLongitude()
    @IsNotEmpty()
    	longitude: number

    @IsLatitude()
    @IsNotEmpty()
    	latitude: number

    @IsNumber()
    @IsNotEmpty()
    	usersCount: number
}
