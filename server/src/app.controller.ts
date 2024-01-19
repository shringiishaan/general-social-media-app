import { Body, Controller, Get, Post } from "@nestjs/common"
import { AppService } from "./app.service"
import { CreateLanguageDto } from "./users/user-languages/language.entity"

@Controller()
export class AppController {

	constructor(
        private readonly appService: AppService,
	) { }

    @Get()
	getHello(): string {
		return this.appService.getHello()
	}

    @Get("getHome")
    getHome(): string {
    	return JSON.stringify({
    		hello: "world"
    	})
    }

    @Post("DB_INIT")
    async dbInit(@Body() body: any): Promise<string> {
    	
    	console.log("Initializing DB INIT Process")
          	
        
        
    	return "DB_INIT"
    }
}

interface INIT_DB_REQUEST {
    languages: CreateLanguageDto[]
}