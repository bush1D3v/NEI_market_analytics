import {io, type Socket} from "socket.io-client";
import type {SocketEvents} from "@/types/Socket/SocketEvents";

const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

const socket: Socket<SocketEvents> = io(`${SERVER_HOST}:${SERVER_PORT}`, {
	withCredentials: true,
	extraHeaders: {
		"Content-Type": "application/json; charset=utf-8",
		Accept: "application/json",
	},
});

export default socket;
