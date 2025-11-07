import { Schema, models, model } from "mongoose";

import { IGuest } from "@/types/models";

const GuestSchema = new Schema<IGuest>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nationalID: { type: String, required: true, unique: true },
  countryFlag: { type: String, required: true },
  nationality: { type: String },
});

export default models.Guest || model<IGuest>("Guest", GuestSchema);
