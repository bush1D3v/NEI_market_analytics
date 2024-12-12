import type {Request, Response} from "express";
import {GoogleGenerativeAI, type Part} from "@google/generative-ai";
import dotenv from "dotenv";
import type {Socket} from "socket.io";
dotenv.config();

const API_KEY = process.env.GEMINI_KEY as string;

const genAI = new GoogleGenerativeAI(API_KEY);

let socket: Socket;

export const setSocket = (socketConnection: Socket) => {
	socket = socketConnection;
};

interface GeminiRequest {
	parts: Part[];
	sessionId: string;
}

/**
 * @description Handles the request to send a prompt to gemini via socket.io
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {void}
 * @throws {Error} If the request to the external API fails
 */
export default async function generateContent(req: Request, res: Response) {
	const {parts, sessionId}: GeminiRequest = req.body;

	const userText = parts[0].text as string;
	const botText = parts[1].text as string;
	const prompt = parts[2].text as string;

	try {
		const model = genAI.getGenerativeModel({model: "gemini-1.5-flash-latest"});
		const chat = model.startChat({
			history: [
				{
					role: "user",
					parts: [{text: userText}],
				},
				{
					role: "model",
					parts: [{text: botText}],
				},
			],
		});
		const result = await chat.sendMessageStream(prompt);

		for await (const chunk of result.stream) {
			const text = chunk.text();
			const refs = chunk.candidates?.[0]?.citationMetadata?.citationSources?.[0]?.uri
				? [chunk.candidates[0].citationMetadata.citationSources[0].uri]
				: [];

			if (socket) {
				try {
					socket.emit("content", {
						text,
						refs,
						sessionId,
					});
				} catch (error) {
					socket.emit("error", {error, sessionId});
					console.error(error);
				}
			}
		}
		if (socket) {
			socket.emit("content_end", sessionId);
		}
		res.status(200).json({message: "success"});
	} catch (error) {
		socket.emit("error", {error, sessionId});
		console.error(error);
		res.status(500).json({error: error});
	}
}
