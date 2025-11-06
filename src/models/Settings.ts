import { Schema, model, models } from "mongoose";
import { settings } from "@/types/models";

const settingsSchema = new Schema<settings>(
  {
    maxBookingLength: { type: Number, required: true },
    minBookingLength: { type: Number, required: true },
    maxGuestsPerBooking: { type: Number, required: true },
  },
  { timestamps: true }
);

export default models.Settings || model<settings>("Settings", settingsSchema);
