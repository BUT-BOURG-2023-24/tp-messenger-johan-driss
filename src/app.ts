import * as http from "http";
import express from "express";
import {Server} from "socket.io";
import {Database} from "./database/database";
import {SocketController} from "./socket/socketController";
import cors from "cors";

const app = express();

function makeApp(database: Database) 
{
	app.locals.database = database;

	app.use(cors({

		credentials: true,

		origin: "http://localhost:3000"

	}));

	const server = http.createServer(app);
	app.use(express.json());

	const io = new Server(server, { cors: { origin: "*" } });
	app.locals.socketController = new SocketController(io, database);

	return { app, server };
}

export { makeApp };
