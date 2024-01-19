import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class UpdatePopCommentDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    	text: string
}
