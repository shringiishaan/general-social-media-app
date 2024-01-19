import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PinUserMap {

    @PrimaryGeneratedColumn({
    	type: "int",
    	name: "id"
    })
    	id: number

    @Column({
    	type: "int",
    	name: "map_pin_id",
    	nullable: false,
    })
    	mapPinId: number

    @Column({
    	type: "int",
    	name: "user_id",
    	nullable: false,
    })
    	userId: number

    @Column({
    	type: "timestamp",
    	name: "create_time",
    	nullable: false,
    	default: () => "CURRENT_TIMESTAMP"
    })
    	createTime: Date
}