import { Module } from "@nestjs/common"
import { PopController } from "./pops.controller"
import { Pop } from "./pop.entity"
import { PopsService } from "./pops.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UsersModule } from "src/users/users.module"
import { PopComment } from "./pop-comment.entity"
import { PopCommentsController } from "./pop-comments.controller"
import { PopCommentsService } from "./pop-comments.service"

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Pop,
			PopComment
		]),
		UsersModule
	],
	controllers: [
		PopController,
		PopCommentsController
	],
	providers: [
		PopsService,
		PopCommentsService
	],
})

export class PopsModule { }