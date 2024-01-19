import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'number' })
    sequenceNumber: number

    @Column({ type: 'datetime' })
    createTime: Date
}