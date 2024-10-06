import { drive } from "../index";

export interface IDriveFolder {
  name: string;
  id: string;
}

export interface IDriveFolderDetails extends IDriveFolder {
  webViewLink: string;
  webContentLink: string;
}

const getFoldersFromDirectory = async (
  folderName: string,
  folderId: string
) => {
  const folderResponse = await drive.files.list({
    q: `name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and '${folderId}' in parents`,
    fields: "files(id, name)",
  });
  const folders = folderResponse.data.files as IDriveFolder[];
  return folders;
};

const getContentsFromDirectory = async (folderId: string) => {
  const folderResponse = await drive.files.list({
    q: `'${folderId}' in parents`, // Query to list files in the folder
    fields: "files(id, name, webViewLink, webContentLink)", // Fields to return, including URLs
  });

  const files = folderResponse.data.files as IDriveFolderDetails[];
  return files;
};

const getFolderInfoFromDirectory = async (
  folderName: string,
  folderId: string
) => {
  const folderResponse = await drive.files.list({
    q: `name = '${folderName}' and '${folderId}' in parents`, // Query to list files in the folder
    fields: "files(id, name, webViewLink, webContentLink)", // Fields to return, including URLs
  });

  const files = folderResponse.data.files as IDriveFolderDetails[];
  return files;
};

export default {
  getFoldersFromDirectory,
  getContentsFromDirectory,
  getFolderInfoFromDirectory,
};
