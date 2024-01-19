import { EUserGender } from "src/interfaces"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
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
import { ChatMessage } from "src/chats/chat-message.entity"
import { Pop } from "src/pops/pop.entity"
import { PopComment } from "src/pops/pop-comment.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "user_id"
    })
    	id: number

    @Column({
    	type: "varchar",
    	length: 100,
    	name: "first_name",
    	nullable: false,
    })
    	firstName: string

    @Column({
    	type: "varchar",
    	length: 100,
    	name: "last_name",
    	nullable: false,
    })
    	lastName: string

    @Column({
    	type: "varchar",
    	length: 10,
    	name: "phone_number",
    	nullable: false,
    })
    	phoneNumber: string

    @Column({
    	type: "enum",
    	name: "gender",
    	enum: ["MALE", "FEMALE", "NON_BINARY"],
    })
    	gender: EUserGender

    @Column({
    	type: "timestamp",
    	name: "date_of_birth",
    	nullable: false,
    })
    	dateOfBirth: Date

    @Column({
    	type: "int",
    	name: "avatar_image_id",
    	nullable: false,
    })
    	avatarImageId: number

    @Column({
    	type: "varchar",
    	length: 20,
    	name: "headline",
    	nullable: true,
    })
    	headline?: string

    @Column({
    	type: "varchar",
    	length: 200,
    	name: "password_hash",
    	nullable: false,
    })
    	passwordHash: string
    
    @OneToMany(
    	() => ChatMessage,
    	chatMessage => chatMessage.sender
    )
    	chatMessages: ChatMessage[]
    
    @OneToMany(
    	() => Pop,
    	pop => pop.owner
    )
    	pops: Pop[]

    @OneToMany(
    	() => PopComment, 
    	comment => comment.pop
    )
    	comments: PopComment[]

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "First name is too short" })
    @MaxLength(100, { message: "First name is too long" })
    	firstName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: "Last name is too short" })
    @MaxLength(100, { message: "Last name is too long" })
    	lastName: string

    @IsString()
    @IsNotEmpty()
    @Length(10, 10, { message: "Phone number must be 10 digits" })
    	phoneNumber: string

    @IsEnum(EUserGender)
    	gender: EUserGender

    @IsDate()
    @IsNotEmpty()
    	dateOfBirth: Date

    @IsNumber()
    @IsNotEmpty()
    	avatarImageId: number

    @IsString()
    @IsNotEmpty()
    	passwordHash: string
}
