import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./users/users.module"
import { AuthModule } from "./users/users-auth/auth.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { ImagesModule } from "./images/images.module"
import { AwsS3Module } from "./aws-s3/aws-s3.module"
import { User } from "./users/user.entity"
import { SocketModule } from "./socket/socket.module"
import { InterestTagsModule } from "./interest-tags/interest-tags.module"
import { InterestTag } from "./interest-tags/interest-tag.entity"
import { InterestTagCategory } from "./interest-tags/interest-tag-category.entity"
import { UserInterestTagsMap } from "./interest-tags/user-interest-tags-map.entity"
import { UserLanguagesModule } from "./users/user-languages/user-languages.module"
import { UserEducationModule } from "./users/user-education/user-education.module"
import { Language } from "./users/user-languages/language.entity"
import { UserLanguageMap } from "./users/user-languages/user-language-map.entity"
import { UserCareer } from "./users/user-career/user-career.entity"
import { Industry } from "./users/user-career/industry.entity"
import { JobRole } from "./users/user-career/job-role.entity"
import { UserEducation } from "./users/user-education/user-education.entity"
import { MapPinsModule } from "./locations/map-pins/map-pins.module"
import { MapPin } from "./locations/map-pins/map-pin.entity"
import { PinUserMap } from "./locations/map-pins/pin-user-map.entity"
import { UserCareerModule } from "./users/user-career/user-career.module"
import { AllLocationsModule } from "./locations/all-locations/all-locations.module"
import { GoogleLocationsModule } from "./locations/google-locations/google-locations.module"
import { Chat } from "./chats/chat.entity"
import { UserChat } from "./chats/user-chat.entity"
import { ChatMessage } from "./chats/chat-message.entity"
import { ChatAttachment } from "./chats/chat-attachment.entity"
import { ChatReaction } from "./chats/chat-reaction.entity"
import { ChatsModule } from "./chats/chats.module"
import { Pop } from "./pops/pop.entity"
import { PopsModule } from "./pops/pops.module"
import { PopComment } from "./pops/pop-comment.entity"

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ".env",
			ignoreEnvFile: false,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get<string>("DB_HOST"),
				port: configService.get<number>("DB_PORT"),
				username: configService.get<string>("DB_USER"),
				password: configService.get<string>("DB_PASS"),
				database: configService.get<string>("DB_NAME"),
				entities: [
					User,
					InterestTag,
					InterestTagCategory,
					UserInterestTagsMap,
					Language,
					UserLanguageMap,
					UserEducation,
					Industry,
					JobRole,
					UserCareer,
					MapPin,
					PinUserMap,
					Chat,
					UserChat,
					ChatMessage,
					ChatAttachment,
					ChatReaction,
					Pop,
					PopComment
				],
				synchronize: true,
				logging: false,
			}),
			inject: [ConfigService],
		}),
		AuthModule,
		UsersModule,
		InterestTagsModule,
		UserCareerModule,
		UserLanguagesModule,
		UserEducationModule,
		ImagesModule,
		AwsS3Module,
		SocketModule,
		MapPinsModule,
		AllLocationsModule,
		GoogleLocationsModule,
		ChatsModule,
		PopsModule
	],
	controllers: [
		AppController,
	],
	providers: [
		AppService,
	],
})

export class AppModule { }