"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function createBooking(bookingData, formData) {
  // Authentication
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  // building booking data
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  //  Mutation
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  // Error handle
  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/account/reservations`);
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect(`/cabins/thankyou`);
}

export async function updateBooking(formData) {
  // Parse form data
  const { numGuests, bookingId, observations } = Object.fromEntries(
    formData.entries()
  );

  // Authentication
  const session = await auth();
  if (!session) throw new Error("you must be logged in");

  // Authorization
  const bookings = await getBookings(session.user.guestId);
  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(Number(bookingId)))
    throw new Error("You are not allowed update this booking ");

  // Building updated data
  const updatedFields = {
    numGuests,
    observations: observations.slice(0, 1000),
  };

  // Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  // handle Errors
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // Redirect and Revalidate
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  // revalidatePath(`/account/reservations`);

  // redirect(`/account/reservations`);
}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateGuest(formData) {
  //we need to keep in mind 2 things
  // 1. First the user who is invoking the actions actually has the access to invoked the server actions
  // 2. Treat all the inputs as unsafe;

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]{6,}$/.test(nationalID))
    throw new Error("Please provide a valid nationalID");

  const updateData = { nationality, nationalID, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile");
}
// This is called sever actions we need to learn it very carefully

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
