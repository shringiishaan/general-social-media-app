import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserCareer {

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
    	name: "industry_id",
    	nullable: true,
    })
    	industryId: number

    @Column({
    	type: "int",
    	name: "job_role_id",
    	nullable: true,
    })
    	jobRoleId: number

    @Column({
    	type: "int",
    	name: "year",
    	nullable: true,
    })
    	year: number

    @Column({
    	type: "int",
    	name: "priority",
    	nullable: true,
    })
    	priority: number

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}