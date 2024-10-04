import { Request, Response } from "express";
import Url from "../models/urlRequest";

const getAll = async (req: Request, res: Response) => {
  try {
    const urls = await Url.find({});
    res.status(200).json(urls);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving all URLs" });
  }
};

const getByEmail = async (req: Request, res: Response) => {
  try {
    const urls = await Url.find({ email: req.params.email });
    res.status(200).json(urls);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving all URLs" });
  }
};

export default {
  getAll,
  getByEmail,
};
