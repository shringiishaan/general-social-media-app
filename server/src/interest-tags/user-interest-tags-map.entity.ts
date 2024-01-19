import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserInterestTagsMap {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "int",
    	name: "user_id",
    	nullable: false,
    })
    	userId: number

    @Column({
    	type: "int",
    	name: "user_interest_id",
    	nullable: false,
    })
    	userInterestId: number

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}