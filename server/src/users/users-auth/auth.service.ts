import { Injectable } from "@nestjs/common"
import { UsersService } from "src/users/users.service"
import { JwtService } from "@nestjs/jwt"
import { User } from "src/users/user.entity"

@Injectable()
export class AuthService {

	constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
	) { }

	async signToken(userId: number): Promise<{ user: User, token: string }> {
		return new Promise((resolve, reject) => {
			this.usersService.findById(userId).then((user: User) => {
				if (user) {
					const payload = { userId: user.id }
					this.jwtService.signAsync(payload).then((token: string) => {
						resolve({ user, token })
					}).catch(reject)
				} else reject()
			}).catch(reject)
		})
	}
}