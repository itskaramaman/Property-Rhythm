import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import Message from "@/app/models/Message";
import { getSessionUser } from "@/app/utils/getSessionUser";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await getSessionUser();
    const userId = session?.userId;

    if (!session || !userId) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const messages = await Message.find({ recipient: userId })
      .populate("property")
      .sort("-createdAt");
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const message = await Message.create(reqBody);
    return NextResponse.json({ message }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
