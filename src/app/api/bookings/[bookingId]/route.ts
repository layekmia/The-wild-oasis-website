import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> } 
) {
  await dbConnect();

  const { bookingId } = await params;
  const updateData = await req.json();

  console.log("Updating booking with ID:", bookingId);

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      updateData,
      { new: true }
    );

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
