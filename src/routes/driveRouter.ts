import express from "express";
import driveController from "../controllers/driveController";

const router = express.Router();

// Get all categories
router.get("/all", driveController.getAllFolders);

router.get("/:folderName", driveController.getFolderContentByFolderName);

export default router;
