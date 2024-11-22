import app from "./app.ts";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { setSocket } from "./proxy/Gemini.ts";
import { corsOptions } from "./config/cors.ts";

const server = createServer(app);
const io = new Server(server, {
    cors: corsOptions,
});

io.on("connection", (socketConnection) => {
    setSocket(socketConnection);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT);
