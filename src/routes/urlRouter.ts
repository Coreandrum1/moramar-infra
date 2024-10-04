import express from "express";
import urlController from "../controllers/urlController.ts";

const router = express.Router();

// Get all categories
router.get("/all", urlController.getAll);

export default router;
