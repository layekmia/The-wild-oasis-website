import Guest from "@/models/Guest";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";

export async function GET(req: NextRequest) {
  await dbConnect();

  const email = req.nextUrl.searchParams.get("email");

  try {
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const guest = await Guest.findOne({ email });
    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    return NextResponse.json(guest);
  } catch (error) {
    console.error("Error in guest route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


