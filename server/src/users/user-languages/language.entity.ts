import { EUserGender } from "src/interfaces"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
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

@Entity()
export class Language {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "varchar",
    	length: 200,
    	name: "name",
    	nullable: false,
    })
    	name: string

    @Column({
    	type: "int",
    	name: "priority",
    	nullable: false,
    	default: 0
    })
    	priority: number

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}

export class CreateLanguageDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "Language name is too short" })
    @MaxLength(200, { message: "Language name is too long" })
    	name: string

    @IsNumber()
    @IsNotEmpty()
    	priority: number
}
