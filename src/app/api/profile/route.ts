import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import { getSessionUser } from "@/app/utils/getSessionUser";
import Property from "@/app/models/Property";

export async function GET(request: NextRequest) {
  try {
    connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const properties = await Property.find({ owner: sessionUser.userId });

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
