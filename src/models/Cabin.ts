import { Schema, model, models } from "mongoose";
import { ICabin } from "@/types/models";

const cabinSchema = new Schema<ICabin>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    maxCapacity: { type: Number, required: true },
    regularPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Cabin = models.Cabin || model("Cabin", cabinSchema);
export default Cabin;
