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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Get rates of property
    const rates = formData.get("rates");
    const { weekly, nightly, monthly } = JSON.parse(rates);

    // Get seller info of property
    const seller_info = formData.get("seller_info");
    const { name, email, phone } = JSON.parse(seller_info);

    // Get location of property
    const location = formData.get("location");
    const { street, city, state, zipcode } = JSON.parse(location);

    // Get amenities and images
    const amenities = formData.getAll("amenities");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");

    // Create propertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street,
        city,
        state,
        zipcode,
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly,
        monthly,
        nightly,
      },
      seller_info: {
        name,
        email,
        phone,
      },
      images,
    };

    return NextResponse.json(propertyData, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
