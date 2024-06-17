import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import Property from "@/app/models/Property";

export async function GET(request: NextRequest) {
  try {
    connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    console.log(userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Valid User ID is required" },
        { status: 400 }
      );
    }

    const properties = await Property.find({ owner: userId });

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
