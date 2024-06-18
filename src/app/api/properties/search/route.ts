import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import Property from "@/app/models/Property";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const location = url.searchParams.get("location") || "";
    const propertyType = url.searchParams.get("propertyType") || "";

    const locationPattern = new RegExp(location, "i");

    let query: { $or: { [key: string]: RegExp }[]; type?: RegExp } = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.street": locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.zipcode": locationPattern },
      ],
    };

    if (propertyType !== "All") {
      const typePattern = new RegExp(propertyType, "i");
      query.type = typePattern;
    }

    const properties = await Property.find(query);

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
