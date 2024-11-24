import {Router} from "express";
import generateContent from "../proxy/Gemini.ts";

const router = Router();

router.post("/gemini-generate", generateContent);

export default router;
