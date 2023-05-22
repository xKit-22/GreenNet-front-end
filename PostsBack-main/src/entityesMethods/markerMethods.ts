import * as express from "express";
import {Request, Response} from "express";
import {createConnection, getRepository} from "typeorm";

import { Marker } from "../entity/Marker"

const  markerRouter = express.Router();
let markerRepository;

markerRouter.get("/", async function(req: Request, res: Response) {
    const markers = await markerRepository.find()
    return res.json(markers)
});

markerRouter.get("/:type", async function(req: Request, res: Response) {
    const markers = await markerRepository.findBy({
        type: req.params.type
    })
    return res.json(markers)
});

markerRouter.delete("/deleteMarker/:id", async function(req: Request, res: Response) {
    const marker = await markerRepository.findOneBy({
        id: req.params.id
    })
    const results = await markerRepository.delete(req.params.id)
    await markerRepository.save(marker)
    return res.send(results)
});

markerRouter.post("/", async function(req: Request, res: Response) { // verification
    const marker = await markerRepository.create(req.body)
    const results = await markerRepository.save(marker)
    return res.send(results)
});

export default () => {
    markerRepository = getRepository(Marker);
         return markerRouter;
};