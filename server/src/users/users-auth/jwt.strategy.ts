import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { jwtConstants } from "./constants"
import { AuthGuard } from "@nestjs/passport"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		})
	}

	async validate(payload: any) {
		console.log("validating payload", payload)
		return payload.userId
	}
}

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") { }