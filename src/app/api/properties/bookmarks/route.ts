import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import { getSessionUser } from "@/app/utils/getSessionUser";
import User from "@/app/models/User";

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

    const user = await User.findById(userId).populate("bookmarks");
    const bookmarks = user.bookmarks;

    return NextResponse.json({ bookmarks }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
