import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	app.use((req, res, next) => {
		console.log(`Request : ${req.url}`)
		next()
	})
	await app.listen(parseInt(process.env.APP_PORT), process.env.APP_HOST, () => console.log(`Server started on port ${process.env.APP_PORT}`))
}

bootstrap()