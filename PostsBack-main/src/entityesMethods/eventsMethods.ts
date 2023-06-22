import * as express from "express";
import {Request, Response} from "express";
import {getRepository, In} from "typeorm";
import {Post} from "../entity/Post";
import {User} from "../entity/User";
import {Subscription} from "../entity/Subscription";
import {Event} from "../entity/Event";

const eventRouter = express.Router();
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


let eventRepository;

// logic to return all events
eventRouter.get("/", async function(req: Request, res: Response) {
    const events = await eventRepository.find()
    return res.json(events)
});

// logic to return event by id
eventRouter.get("/:id", async function(req: Request, res: Response) {
    const results = await eventRepository.findOneBy({
        id: req.params.id
    })
    return res.send(results)
});

// logic to create and save an event
eventRouter.post("/", async function(req: Request, res: Response) {  //verification
    const event = await eventRepository.create(req.body)
    const results = await eventRepository.save(event)
        .then(res => {
            const base64Data = req.body.QRurl.replace(/^data:image\/png;base64,/, '');
            const imageBuffer = Buffer.from(base64Data, 'base64');
            const startDate = new Date(req.body.dateOfStart)
            const finishDate = new Date(req.body.dateOfFinish)
            const mailOptions = {
                from: 'green_net2023@mail.ru',
                to: 'alexandra.volo18@gmail.com',
                subject: `Уведомление о создании меропрятии ${req.body.name}`,
                html: `<h1>Вы являетесь организатором меропрятия ${req.body.name}</h1>
                        <p><b>Описание: </b>${req.body.description}</p>
                        <p><b>Дата начала: </b>${startDate.getDate()}.${startDate.getMonth() + 1}.${startDate.getFullYear()}</p>
                        <p><b>Дата окончания: </b>${finishDate.getDate()}.${finishDate.getMonth() + 1}.${finishDate.getFullYear()}</p>
                        <p><b>Место: </b>${req.body.place}</p>
                        <p><b>Контакты: </b>${req.body.contacts}</p>
                        `,
                attachments: [
                    {
                        filename: 'image.png',
                        content: imageBuffer,
                        contentType: 'image/png'
                    }
                ]
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
    return res.send(results)
});

// logic to subscribe
eventRouter.post("/subscribe", async function(req: Request, res: Response) {  //verification
    const event = await eventRepository.findOneBy({
        id: req.body.id
    })
    event.membersArr.push(JSON.stringify({id: req.body.currentUserId, isMarked: false}))
    const result = await eventRepository.save(event)
    return res.send(result)
});

// logic to unsubscribe
eventRouter.post("/unsubscribe", async function(req: Request, res: Response) {  //verification
    const event = await eventRepository.findOneBy({
        id: req.body.id
    })
    event.membersArr = event.membersArr.filter(item => {
        const itemTmp = JSON.parse(item)
        return itemTmp.id != req.body.currentUserId
    })
    const result = await eventRepository.save(event)
    return res.send(result)
});

//logic to mark user

eventRouter.post("/mark", async function(req: Request, res: Response) {  //verification
    const event = await eventRepository.findOneBy({
        id: req.body.id
    })
    const updateItem = event.membersArr.forEach((item, index) => {
        const itemObj = JSON.parse(item);
        if (itemObj.id === req.body.userId) {
            itemObj.isMarked = !itemObj.isMarked;
            event.membersArr[index] = JSON.stringify(itemObj);
        }
    })
    eventRepository.merge(event, updateItem)
    const result = await eventRepository.save(event)
    return res.send(result)
});


//delete event
eventRouter.delete("/:id", async function(req: Request, res: Response) {  //verification
    const results = await eventRepository.delete(req.params.id)
    return res.send(results)
});


export default () => {
    eventRepository = getRepository(Event);
    return eventRouter;
}