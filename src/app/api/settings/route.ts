import Setting from "@/models/Settings";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const settings = await Setting.findOne().sort({ createdAt: -1 });
    if (!settings)
      return NextResponse.json(
        { error: "Settings not found" },
        { status: 404 }
      );
    return NextResponse.json(settings);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
