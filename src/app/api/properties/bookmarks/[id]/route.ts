import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import { getSessionUser } from "@/app/utils/getSessionUser";
import User from "@/app/models/User";
import Property from "@/app/models/Property";
import { BSON, BSONType } from "mongodb";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const session = await getSessionUser();
    const userId = session?.userId;

    if (!session || !userId) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId);
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { message: "Incorrect property ID" },
        { status: 403 }
      );
    }

    if (!user.bookmarks.includes(id)) {
      user.bookmarks.push(id);
      await user.save();
    }

    return NextResponse.json(
      { message: "Bookmark saved successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const session = await getSessionUser();
    const userId = session?.userId;

    if (!session || !userId) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId);
    const filterdBookmarks = user.bookmarks.filter(
      (bookmarkId: BSONType) => bookmarkId.toString() !== id
    );

    user.bookmarks = filterdBookmarks;
    await user.save();

    return NextResponse.json(
      { message: "Bookmark removed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
