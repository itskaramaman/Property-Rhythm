import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import { getSessionUser } from "@/app/utils/getSessionUser";
import Message from "@/app/models/Message";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const message = await Message.findById(id);
    if (!message) {
      return NextResponse.json(
        { message: "Message not found" },
        { status: 404 }
      );
    }

    if (message.recipient.toString() != session?.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    message.read = !message.read;
    await message.save();
    return NextResponse.json({ message }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
