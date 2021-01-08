import mongoose from "mongoose";
import options from "../config";

const ITEM_TYPES = ["Big", "Medium", "Small"];

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 150,
    },
    type: {
      type: String,
      default: "Medium",
      required: true,
      unique: false,
      trim: true,
      enum: ITEM_TYPES,
      maxlength: 50,
    },
    image: {
      type: String,
      required: false,
      default: options.defaultImage,
    },
    owner: {
      //ref: "owner",      Reference to another schema. More here https://mongoosejs.com/docs/populate.html
      type: mongoose.SchemaTypes.ObjectId,
      required: false,
    },
  },
  { timestamps: true }
);

export const Item = mongoose.model("item", itemSchema);
