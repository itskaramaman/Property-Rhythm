import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import Property from "@/app/models/Property";
import { getSessionUser } from "@/app/utils/getSessionUser";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ property }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const session = await getSessionUser();
    const currentUserId = session?.userId;

    const propertyId = params.id;
    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    if (property.owner.toString() !== currentUserId) {
      return NextResponse.json(
        { message: "No rights to delete this property" },
        { status: 401 }
      );
    }

    await Property.findByIdAndDelete(propertyId);

    return NextResponse.json(
      { message: "Property Deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const session = await getSessionUser();
    const sessionUserId = session?.userId;

    if (!sessionUserId) {
      return NextResponse.json(
        { message: "User not logged in" },
        { status: 401 }
      );
    }

    const reqBody = await request.json();

    const property = await Property.findById(reqBody.id);
    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    if (property.owner.toString() !== sessionUserId) {
      return NextResponse.json(
        { message: "Property owner and current user are different" },
        { status: 400 }
      );
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      reqBody.id,
      reqBody,
      { new: true }
    );

    return NextResponse.json({ updatedProperty }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
