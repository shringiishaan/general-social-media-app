import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { jwtConstants } from "./constants"
import { UsersModule } from "src/users/users.module"
import { AuthService } from "./auth.service"
import { PassportModule } from "@nestjs/passport/dist/passport.module"
import { LocalStrategy } from "./local.strategy"
import { JwtStrategy } from "./jwt.strategy"

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: jwtConstants.secret,
				global: true,
				signOptions: { expiresIn: "2d" },
			})
		}),
	],
	controllers: [
		AuthController
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy
	],
	exports: [],
})

export class AuthModule { }