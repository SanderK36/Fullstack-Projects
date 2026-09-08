import { Router } from "express";
import rateLimit from "express-rate-limit";

import { sendContactMessage } from "../controllers/contactController.js";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {message: "Too many messages sent. Please try again in 15 minutes.",},
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", contactLimiter, sendContactMessage);

export default router;