import {Entity, Column, OneToMany, ManyToMany, PrimaryColumn, BeforeInsert} from "typeorm";
import {JoinTable} from "typeorm";

const shortid = require('shortid');

@Entity('marker')
export class Marker {
    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

    @Column()
    title: string

    @Column({nullable: true})
    description: string

    @Column({type: 'jsonb'})
    coordinates: number[]

    @Column()
    type: string

    @Column({nullable: true})
    ownerId: number
}
