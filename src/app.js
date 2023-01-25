import  express  from "express";
import config from "./config";
/* 
import clientsRoutes from "./routes/clients"; */

import * as routes from './routes'

const app = express();

let port = config.port;

//settings
app.set("port", port);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/clients', routes.clientRoute)
app.use('/api/bajaj', routes.bajajRoute)
app.use('/api/ford', routes.fordRoute)
app.use('/api/peugeot', routes.peugeotRoute)
app.use('/api/foton', routes.fotonRoute)

export default app;