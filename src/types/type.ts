import { Types } from "mongoose";
import { IBooking } from "./models";

interface ICabin {
  _id: Types.ObjectId;
  name: string;
  image: string;
}

export interface IBookingPopulated extends Omit<IBooking, "cabinId"> {
  cabinId: ICabin;
}
