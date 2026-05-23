import { express } from "express";
import cors from "cors";
import { AppController } from "../controllers/App.controller";

const app = express();
app.use(express.json(), cors());

app.get("/app", AppController);
