import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Cabin from "@/models/Cabin";

export async function GET(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.searchParams.get("id");
  const type = req.nextUrl.searchParams.get("type") || "all";

  try {
    switch (type) {
      case "single":
        if (!id)
          return NextResponse.json(
            { error: "Cabin id required" },
            { status: 400 }
          );

        const cabin = await Cabin.findById(id);
        if (!cabin)
          return NextResponse.json(
            { error: "Cabin not found" },
            { status: 404 }
          );

        return NextResponse.json(cabin); // return full cabin object

      case "price":
        if (!id)
          return NextResponse.json(
            { error: "Cabin id required" },
            { status: 400 }
          );

        const cabinPrice = await Cabin.findById(id).select(
          "regularPrice discount"
        );
        if (!cabinPrice)
          return NextResponse.json(
            { error: "Cabin not found" },
            { status: 404 }
          );

        return NextResponse.json({
          regularPrice: cabinPrice.regularPrice,
          discount: cabinPrice.discount,
        });

      default:
        const cabins = await Cabin.find();
        if (!cabins.length)
          return NextResponse.json(
            { error: "No cabins found" },
            { status: 404 }
          );

        return NextResponse.json(cabins);
    }
  } catch (err) {
    console.error("Error fetching cabins:", err);
    return NextResponse.json(
      { error: "Failed to fetch cabins" },
      { status: 500 }
    );
  }
}
