import mongoose, { Document, Schema } from "mongoose";

interface IUrl extends Document {
  url: string;
  email: string;
}

export const urlSchema = new Schema<IUrl>(
  {
    url: {
      type: String,
      required: [true, "Property is required"],
    },
    email: {
      type: String,
      required: [true, "Property is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model<IUrl>("google_drive_urls", urlSchema);

export default Url;
