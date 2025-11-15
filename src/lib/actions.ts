"use server";

import { getSession } from "@/helpers/getSession";
import { getGuestByEmail, updateGuestProfile } from "./apiService";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("You must be logged in");

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
