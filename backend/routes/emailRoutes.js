import express from "express";
import { sendEmails } from "../controllers/emailController.js";

const router = express.Router();

// POST => /api/send-email
router.post("/send-email", sendEmails);

export default router;
