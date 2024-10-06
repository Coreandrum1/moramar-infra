import { Request, Response } from "express";
import driveModel from "../models/drive";

const getAllFolders = async (req: Request, res: Response) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;
    console.log(folderId);
    const files = await driveModel.getContentsFromDirectory(folderId);
    res.json(files);
  } catch (error) {
    console.error("Error fetching folder list", error);
    res.status(500).send("Failed to retrieve folder list.");
  }
};

const getFileInfoFromDirectory = async (req: Request, res: Response) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;
    const files = await driveModel.getFolderInfoFromDirectory(
      req.params.folderName,
      folderId
    );

    if (!files.length) {
      res.json([]);
      return;
    }
    res.json(files[0]);
  } catch (error) {
    console.error("Error fetching folder details", error);
    res.status(500).send("Failed to retrieve folder details");
  }
};

const getFolderContentByFolderName = async (req: Request, res: Response) => {
  try {
    const folderId = process.env.DRIVE_FOLDER_ID;
    const folderName = req.params.folderName;
    const folders = await driveModel.getFoldersFromDirectory(
      folderName,
      folderId
    );
    if (!folders.length) {
      res.json([]);
      return;
    }
    const folderToUseId = folders[0].id;
    const files = await driveModel.getContentsFromDirectory(folderToUseId);
    res.json(files);
  } catch (error) {
    console.error("Error fetching folder contents", error);
    res.status(500).send("Failed to retrieve folder contents.");
  }
};

export default {
  getAllFolders,
  getFileInfoFromDirectory,
  getFolderContentByFolderName,
};
