import { Request, Response } from "express";
import { drive } from "../index";

const folderId = process.env.DRIVE_FOLDER_ID;

const getAllFolders = async (req: Request, res: Response) => {
  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents`, // Query to list files in the folder
      fields: "files(id, name, webViewLink, webContentLink)", // Fields to return, including URLs
    });
    const files = response.data.files;

    if (files.length) {
      const fileDetails = files.map((file) => ({
        name: file.name,
        id: file.id,
        webViewLink: file.webViewLink, // Link to view the file
        webContentLink: file.webContentLink, // Direct download link (for non-Google files like images, PDFs)
      }));
      res.json(fileDetails);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching folder list", error);
    res.status(500).send("Failed to retrieve folder list.");
  }
};

const getFolderInfoByName = async (req: Request, res: Response) => {
  try {
    const response = await drive.files.list({
      q: `name = '${req.params.folderName}' and '${folderId}' in parents`, // Query to list files in the folder
      fields: "files(id, name, webViewLink, webContentLink)", // Fields to return, including URLs
    });

    const files = response.data.files;
    if (files.length) {
      const fileDetails = files.map((file) => ({
        name: file.name,
        id: file.id,
        webViewLink: file.webViewLink, // Link to view the file
        webContentLink: file.webContentLink, // Direct download link (for non-Google files like images, PDFs)
      }));
      res.json(fileDetails[0]);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching folder details", error);
    res.status(500).send("Failed to retrieve folder details");
  }
};

const getFolderContentByFolderName = async (req: Request, res: Response) => {
  try {
    const folderName = req.params.folderName;
    // Step 1: Find the folder by name
    const folderResponse = await drive.files.list({
      q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and '${folderId}' in parents`,
      fields: "files(id, name)",
    });

    const folders = folderResponse.data.files;

    if (!folders.length) {
      res.send("Folder not found.");
      return;
    }

    // Step 2: Use the folder ID to list its contents
    const folderToUseId = folders[0].id;
    const fileResponse = await drive.files.list({
      q: `'${folderToUseId}' in parents`, // Query to list files within the folder
      fields: "files(id, name, webViewLink, webContentLink)", // Fields to return, including URLs
    });

    const files = fileResponse.data.files;

    if (files.length) {
      const fileDetails = files.map((file) => ({
        name: file.name,
        id: file.id,
        webViewLink: file.webViewLink, // Link to view the file
        webContentLink: file.webContentLink, // Direct download link (for non-Google files like images, PDFs)
      }));
      res.json(fileDetails);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Error fetching folder contents", error);
    res.status(500).send("Failed to retrieve folder contents.");
  }
};

export default {
  getAllFolders,
  getFolderInfoByName,
  getFolderContentByFolderName,
};
