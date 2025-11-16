"use server";

import { getSession } from "@/helpers/getSession";
import {
  deleteBooking,
  getBookings,
  getGuestByEmail,
  updateGuestProfile,
} from "./apiService";
import { revalidatePath } from "next/cache";

export async function deleteReservation(bookingId: string) {
  // 1. Ensure the user is authenticated
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in.");
  }

  const userId = session.user.id;

  // Fetch ONLY bookings owned by this user
  const { data: bookings } = await getBookings(userId);

  if (!bookings || bookings.length === 0) {
    throw new Error("No reservations found for this user.");
  }

  //Ensure the booking belongs to the user
  const isOwner = bookings.some((booking) => booking._id === bookingId);

  if (!isOwner) {
    throw new Error(
      "You are not allowed to delete someone else's reservation."
    );
  }

  // Perform delete operation
  await deleteBooking(bookingId);

  //Revalidate UI
  revalidatePath("/account/reservations");
}

export async function updateProfile(formData: FormData) {
  // verify authentication
  const session = await getSession();
  if (!session) throw new Error("You must be logged in");

  // check the guest in the database;
  const { data: guest } = await getGuestByEmail(session.user.email as string);
  if (!guest) throw new Error("Guest not found");

  const nationalID = formData.get("nationalID") as string | null;

  // Read nationality field safely
  const nationalityRaw = formData.get("nationality") as string | null;

  let nationality: string | null = null;
  let countryFlag: string | null = null;

  if (nationalityRaw && typeof nationalityRaw === "string") {
    const parts = nationalityRaw.split("%");
    nationality = parts[0] ?? null;
    countryFlag = parts[1] ?? null;
  }

  await updateGuestProfile(guest._id, nationalID, nationality, countryFlag);
  revalidatePath("/account/profile");
}
