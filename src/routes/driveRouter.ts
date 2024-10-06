import express from "express";
import driveController from "../controllers/drive";

const router = express.Router();

router.get("/all", driveController.getAllFolders);

router.get("/:folderName", driveController.getFolderContentByFolderName);

export default router;
