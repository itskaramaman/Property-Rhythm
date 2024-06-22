import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import { getSessionUser } from "@/app/utils/getSessionUser";
import Message from "@/app/models/Message";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const count = await Message.countDocuments({
      recipient: session.userId,
      read: false,
    });

    return NextResponse.json({ count }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
