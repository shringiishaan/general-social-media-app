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
export class UserLanguageMap {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "int",
    	name: "user_id"
    })
    	userId: number

    @Column({
    	type: "int",
    	name: "language_id"
    })
    	languageId: number

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}

export class CreateUserLanguageMapDto {

    @IsNumber()
    @IsNotEmpty()
    	userId: number

    @IsNumber()
    @IsNotEmpty()
    	languageId: number
}
