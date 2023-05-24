import * as express from "express";
import {Request, Response} from "express";
import {getRepository, In} from "typeorm";
import {Post} from "../entity/Post";
import {User} from "../entity/User";
import {Subscription} from "../entity/Subscription";
import {Event} from "../entity/Event";

const eventRouter = express.Router();

let eventRepository;

// logic to return all events
eventRouter.get("/", async function(req: Request, res: Response) {
    const events = await eventRepository.find()
    return res.json(events)
});

// logic to return post by id
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
    return res.send(results)
});

// logic to subscribe
eventRouter.post("/subscribe", async function(req: Request, res: Response) {  //verification
    const event = await eventRepository.findOneBy({
        id: req.body.id
    })
    event.membersArr.push(req.body.currentUserId)
    const result = await eventRepository.save(event)
    return res.send(result)
});

// logic to unsubscribe
eventRouter.post("/unsubscribe", async function(req: Request, res: Response) {  //verification
    const event = await eventRepository.findOneBy({
        id: req.body.id
    })
    event.membersArr = event.membersArr.filter(e => {
        return e != req.body.currentUserId
    })
    const result = await eventRepository.save(event)
    return res.send(result)
});


export default () => {
    eventRepository = getRepository(Event);
    return eventRouter;
}