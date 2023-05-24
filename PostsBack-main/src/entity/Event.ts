import {User} from "./User";
import {BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryColumn} from "typeorm";

const shortid = require('shortid');

@Entity()
export class Event {
    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

    @Column({nullable: true})
    avatar: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    dateOfStart: string

    @Column()
    dateOfFinish: string

    @Column()
    place: string

    @Column()
    contacts: string

    @Column()
    reward: number

    @Column({
        type: 'jsonb',
        nullable: true
    })
    membersArr: string[]

    @Column()
    adminID: string

    @ManyToMany(type => User, user => user.events) users: User[]
}