import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserEducation {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "int",
    	name: "user_id",
    	nullable: false,
    })
    	userId: number

    @Column({
    	type: "varchar",
    	length: 200,
    	name: "course",
    	nullable: true,
    })
    	course?: string

    @Column({
    	type: "varchar",
    	length: 200,
    	name: "college",
    	nullable: true,
    })
    	college?: string

    @Column({
    	type: "varchar",
    	length: 4,
    	name: "graduation_year",
    	nullable: true,
    })
    	graduationYear?: string

    @Column({
    	type: "int",
    	name: "priority",
    	nullable: false,
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

export class CreateEducationDto {

    @IsNumber()
    @IsNotEmpty()
    	userId: number

    @IsString()
    @Length(3, 200, { message: "Course name must be between 3 and 200 characters" })
    	course?: string
    
    @IsString()
    @Length(3, 200, { message: "College name must be between 3 and 200 characters" })
    	college?: string

    @IsString()
    @Length(4, 4, { message: "Graduation year must be 4 digits" })
    	graduationYear?: string
    
    @IsNumber()
    @IsNotEmpty()
    	priority: number
}
