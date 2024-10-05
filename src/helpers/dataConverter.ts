export const base64ToJson = (str: string) => {
  try {
    return JSON.parse(Buffer.from(str, "base64").toString("utf-8"));
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
};
