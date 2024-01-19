import { Strategy } from "passport-local"
import { AuthGuard } from "@nestjs/passport"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UsersService } from "src/users/users.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

	constructor(
        private usersService: UsersService
	) { super() }

	async validate(phoneNumber: string, password: string): Promise<any> {
		try {
			const userId: number = await this.usersService.checkUserPassword(phoneNumber, password)
			if (!userId) {
				throw new UnauthorizedException()
			}
			return userId
		} catch {
			throw new UnauthorizedException()
		}
	}
}

@Injectable()
export class LocalAuthGuard extends AuthGuard("local") { }