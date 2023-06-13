import {Entity, Column, OneToMany, ManyToMany, PrimaryColumn, BeforeInsert} from "typeorm";
import {Post} from "./Post";
import {Comment} from "./Comment";
import {Event} from "./Event";
import {JoinTable} from "typeorm";

const shortid = require('shortid');

@Entity('users')
export class User {
    @PrimaryColumn("varchar", {
        length: 20
    })
    id: string;

    @BeforeInsert()
    setId() {
        this.id = shortid.generate();
    }

    @Column()
    nickname: string

    @Column({nullable: true})
    avatar: string

    @Column({nullable: true})
    description: string

    @Column({nullable: true})
    coinsAmount: number

    @Column()
    postsAmount: number

    @Column()
    subscribersAmount: number

    @Column()
    subscriptionsAmount: number

    @Column()
    allLikesAmount: number

    @Column({nullable: true})
    isAdmin: boolean

    @Column()
    dateOfCreation: string

    @Column()
    userLogin: string

    @Column()
    userPassword: string

    @Column({
        type: 'jsonb',
        nullable: true
    })
    likedPosts: string[]

    @OneToMany(type => Post, post => post.user) posts: Post[]
    @OneToMany(type => Comment, comment => comment.user) comments: Comment[]
    @ManyToMany(type => Event, event => event.users) events: Event[]
}
