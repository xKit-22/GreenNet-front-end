import {BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";

const shortid = require('shortid');

@Entity()
export class Shop{
    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

    @Column()
    img: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    cost: number

    @Column()
    validityDate: string

    @Column()
    isUsed: boolean
}