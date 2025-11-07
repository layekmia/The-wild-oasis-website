import { dbConnect } from "@/lib/db";
import Guest from "@/models/Guest";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { guestId: string } }
) {
  await dbConnect();

  const { guestId } = params;
  const updateData = await req.json();

  try {
    const updatedGuest = await Guest.findByIdAndUpdate(guestId, updateData, {
      new: true,
    });
    if (!updatedGuest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    return NextResponse.json(updatedGuest);
  } catch (error) {
    console.error("Error updating guest:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
