import * as express from "express";
import {Request, Response} from "express";
import {createConnection, getRepository} from "typeorm";
import {User} from "../entity/User";
//import 'dotenv/config'
import {Comment} from "../entity/Comment";

require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'green_net2023@mail.ru',
      pass: 'EduNuDVQvLCJrsEpxjHG'
    },
    tls: {
        rejectUnauthorized: false
    }
  }, {
    from: 'Green-Net <green_net2023@mail.ru>',
  },
  );


const secret = 'secret'

    let userRepository

    authRouter.post("/login",  async function(req: Request, res: Response) {
        const candidate = await userRepository.findOneBy({
            userLogin: req.body.userLogin
        })

        if (candidate) {
            //Password check, user exist
            const passwordResult = bcrypt.compareSync(req.body.userPassword, candidate.userPassword)

            if (passwordResult) {
                //Passwords matched, generate token
                const token = jwt.sign({
                    userLogin: candidate.userLogin,
                    id: candidate.id
                }, secret , {expiresIn: '10h'}) //process.env.JWT_KEY

                res.status(200).json({
                    token: token
                })
            } else {
                res.status(401).json({
                    message: "Введен неправильный пароль."
                })
            }
        } else {
            //User not found
            res.status(404).json({
                message: "Пользователь с таким email не найден."
            })
        }

    })

    //logic to registration of user
    authRouter.post('/register', async function (req: Request, res: Response) {
        const candidate = await userRepository.findOneBy({
            userLogin: req.body.userLogin
        })

        if (candidate) {
            // Error: User exist
            res.status(409).json({
                    message: 'Пользователь с таким email уже зарегистрирован.'
                })
        } else {
            //Create user
            const salt = bcrypt.genSaltSync(10)
            const password = req.body.userPassword
            const user = await userRepository.create({
                nickname: req.body.nickname,
                avatar: req.body.avatar,
                coinsAmount: 0,
                postsAmount: 0,
                subscribersAmount: 0,
                subscriptionsAmount: 0,
                allLikesAmount: 0,
                dateOfCreation: new Date().toISOString().split('T')[0],
                userLogin: req.body.userLogin,
                userPassword: bcrypt.hashSync(password, salt),
                likedPosts: [],
                isAdmin: req.body.isAdmin || false,
                activation: false
            })
            try {
                const results = await userRepository.save(user)
                    .then(res => {
                        const mailOptions = {
                            from: 'green_net2023@mail.ru',
                            to: req.body.userLogin,
                            subject: 'Подтверждение регистрации',
                            html: `<h1>Для подтверждения перейдите по ссылке!</h1><a href="http://localhost:3001/activation/${res.id}">Подтвердить!</a>`
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log(error);
                            } else {
                              console.log('Email sent: ' + info.response);
                            }
                          });
                    })
                res.status(201).json(results)
                return res.send(results)
            } catch (e){
                res.status(500).json({
                    success: false,
                    message: e.message ? e.message : e
                })
            }
        }
    })


export default () => {
    userRepository = getRepository(User);
    return authRouter;
}


//      http://localhost:3000/api/auth/login