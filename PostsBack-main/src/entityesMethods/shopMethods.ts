import * as express from "express";
import {Request, Response} from "express";
import {getRepository, In} from "typeorm";
import {Shop} from "../entity/Shop";

const shopRouter = express.Router();

let shopRepository;

// logic to return all shop cards
shopRouter.get("/", async function(req: Request, res: Response) {
    const shop = await shopRepository.find()
    return res.json(shop)
});

// logic to return shop card by id
shopRouter.get("/:id", async function(req: Request, res: Response) {
    const results = await shopRepository.findOneBy({
        id: req.params.id
    })
    return res.send(results)
});

// logic to create and save a shop card
shopRouter.post("/", async function(req: Request, res: Response) {  //verification
    const shop = await shopRepository.create(req.body)
    const results = await shopRepository.save(shop)
    return res.send(results)
});


//delete shop card
shopRouter.delete("/:id", async function(req: Request, res: Response) {  //verification
    const results = await shopRepository.delete(req.params.id)
    return res.send(results)
});


export default () => {
    shopRepository = getRepository(Shop);
    return shopRouter;
}