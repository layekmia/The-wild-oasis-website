import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { eachDayOfInterval } from "date-fns";
import Booking from "@/models/Booking";

export async function POST(req: NextRequest) {
  // Booking creation logic will go here
  await dbConnect();

  const {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
    guestId,
    numGuests,
    observations,
    extraPrice,
    totalPrice,
    isPaid,
    hasBreakfast,
    status,
  } = await req.json();

  try {
    const booking = await Booking.create({
      startDate,
      endDate,
      numNights,
      cabinPrice,
      cabinId,
      guestId,
      numGuests,
      observations,
      extraPrice,
      totalPrice,
      isPaid,
      hasBreakfast,
      status,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  // ⬇️ Import after ensuring Mongoose is connected
  const Booking = (await import("@/models/Booking")).default;
  const Cabin = (await import("@/models/Cabin")).default;

  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type") || "list";
  const id = searchParams.get("id");
  const guestId = searchParams.get("guestId");
  const cabinId = searchParams.get("cabinId");

  try {
    switch (type) {
      // 🟢 Get single booking by ID
      case "single": {
        if (!id)
          return NextResponse.json(
            { error: "Booking id required" },
            { status: 400 }
          );

        const booking = await Booking.findById(id);
        if (!booking)
          return NextResponse.json(
            { error: "Booking not found" },
            { status: 404 }
          );

        return NextResponse.json(booking);
      }

      // 🟢 Get all bookings for a guest
      case "list": {
        if (!guestId)
          return NextResponse.json(
            { error: "Guest id required" },
            { status: 400 }
          );

        const bookings = await Booking.find({ guestId })
          .select(
            "createdAt startDate endDate numNights numGuests totalPrice guestId cabinId"
          )
          .populate("cabinId", "name image") // only fetch name & image from Cabin
          .sort({ startDate: 1 });

        if (!bookings.length)
          return NextResponse.json(
            { error: "No bookings found" },
            { status: 404 }
          );

        return NextResponse.json(bookings);
      }

      // 🟢 Get all booked dates for a specific cabin
      case "bookedDates": {
        if (!cabinId)
          return NextResponse.json(
            { error: "Cabin id required" },
            { status: 400 }
          );

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const bookings = await Booking.find({
          cabinId,
          $or: [{ startDate: { $gte: today } }, { status: "checked-in" }],
        });

        console.log("Bookings for bookedDates:", bookings);

        if (!bookings.length)
          return NextResponse.json(
            { error: "No booked dates found" },
            { status: 404 }
          );

        const bookedDates = bookings
          .map((b) =>
            eachDayOfInterval({
              start: new Date(b.startDate),
              end: new Date(b.endDate),
            })
          )
          .flat();

        return NextResponse.json(bookedDates);
      }

      default:
        return NextResponse.json(
          { error: "Invalid type parameter" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
