import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import Property from "@/app/models/Property";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const properties = await Property.find({}).sort("-createdAt");
    return NextResponse.json(
      {
        properties,
      },
      { status: 200 }
    );
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
