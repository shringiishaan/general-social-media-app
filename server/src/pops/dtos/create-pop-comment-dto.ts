import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreatePopCommentDto {
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    	text: string
}