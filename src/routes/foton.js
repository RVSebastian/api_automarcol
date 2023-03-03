import { Router } from "express";
import { getFotonInv, getFotonRep, getFotonRepAll, getFotonVta } from "../controllers";

export const fotonRoute = Router();

fotonRoute.get("/inv", getFotonInv);

fotonRoute.get("/rep", getFotonRep);

fotonRoute.get("/rep/all", getFotonRepAll);

fotonRoute.post("/vta", getFotonVta);


