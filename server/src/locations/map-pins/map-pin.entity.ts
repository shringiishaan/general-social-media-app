import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class MapPin {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "varchar",
    	length: 200,
    	name: "name",
    	nullable: false,
    })
    	name: string

    @Column({
    	type: "int",
    	name: "users_count",
    	nullable: false,
    })
    	usersCount: number

    @Column({
    	type: "float",
    	name: "latitude",
    	nullable: false,
    })
    	latitude: number

    @Column({
    	type: "float",
    	name: "longitude",
    	nullable: false,
    })
    	longitude: number

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}