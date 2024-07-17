import http from "http";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { Request, Response } from "express";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import users from "./routes/users";

app.use("/api/v1/users", users);

// @desc Root page
// @route GET /
app.get("/", async (req: Request, res: Response) => {
    res.status(200).send("<h1>TurnPoint</h1>");
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
