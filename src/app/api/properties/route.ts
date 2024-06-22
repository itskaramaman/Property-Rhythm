import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import Property from "@/app/models/Property";
import { getSessionUser } from "@/app/utils/getSessionUser";
import cloudinary from "@/app/config/cloudinary";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const page =
      parseInt(request.nextUrl.searchParams.get("page") as string) || 1;
    const pageSize =
      parseInt(request.nextUrl.searchParams.get("pageSize") as string) || 6;

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments();
    const properties = await Property.find({})
      .sort("-createdAt")
      .skip(skip)
      .limit(pageSize);
    return NextResponse.json(
      {
        properties,
        total,
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
    await connectDB();

    // 1. Get session user
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Get Form data
    const formData = await request.formData();

    // Extract rates of property
    const rates = formData.get("rates") as string;
    const { weekly, nightly, monthly } = JSON.parse(rates);

    // Extract seller info of property
    const sellerInfo = formData.get("seller_info") as string;
    const { name, email, phone } = JSON.parse(sellerInfo);

    // Extract location of property
    const location = formData.get("location") as string;
    const { street, city, state, zipcode } = JSON.parse(location);

    // Extract amenities and images
    const amenities: string[] = JSON.parse(formData.get("amenities") as string);

    // Get all uploaded images
    const images = formData.getAll("images");

    // Filter valid images (Files) and process them
    const validImages = images.filter(
      (image) => image instanceof File && image.name !== ""
    );

    // Handle images upload to Cloudinary
    const imageUploadPromises = formData.getAll("images").map(async (image) => {
      // @ts-ignore
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString("base64");

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "PropertyRhythmCloud",
        }
      );

      return result.secure_url;
    });

    // Wait for all images to upload
    const uploadedImages = await Promise.all(imageUploadPromises);

    // Construct property data object
    const propertyData = {
      type: JSON.parse(formData.get("type") as string),
      name: JSON.parse(formData.get("name") as string),
      description: JSON.parse(formData.get("description") as string),
      location: { street, city, state, zipcode },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: { weekly, monthly, nightly },
      seller_info: { name, email, phone },
      owner: sessionUser.userId,
      images: uploadedImages,
    };

    // Example: Save propertyData to MongoDB (if using mongoose)
    const newProperty = new Property(propertyData);
    await newProperty.save();

    return NextResponse.json({ propertyId: newProperty._id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
