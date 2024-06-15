"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  type: z.string(),
  name: z.string().min(1, { message: "Name is required" }),
  description: z.string().optional(),
  location: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
  beds: z
    .number({ message: "Number of beds is required" })
    .positive({ message: "Number of bedrooms should be positive" }),
  baths: z
    .number({ message: "Number of baths is required" })
    .positive({ message: "Number of baths should be positive" }),
  square_feet: z
    .number({ message: "Square feet is required" })
    .positive({ message: "Square feet bedrooms should be positive" }),
  seller_info: z.object({
    name: z.string().min(1, "Name of seller is required"),
    email: z.string().email({ message: "Email should be genuine" }),
    phone: z.string(),
  }),
  rates: z.object({
    nightly: z.preprocess(
      (val: any) => (Number.isNaN(val) ? undefined : parseFloat(val)),
      z.number().optional()
    ),
    weekly: z.preprocess(
      (val: any) => (Number.isNaN(val) ? undefined : parseFloat(val)),
      z.number().optional()
    ),
    monthly: z.preprocess(
      (val: any) => (Number.isNaN(val) ? undefined : parseFloat(val)),
      z.number().optional()
    ),
  }),
  amenities: z.array(z.string()),
  images: z.array(z.unknown()),
});

type TFormSchema = z.infer<typeof formSchema>;

const PropertyAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TFormSchema>({ resolver: zodResolver(formSchema) });

  const router = useRouter();

  const handleFormSubmit = async (data: TFormSchema) => {
    try {
      const formData = new FormData();

      // Iterate over form data and append each pair
      for (let pair of Object.entries(data)) {
        // If pair is images, handle appending files
        if (pair[0] === "images") {
          for (let i = 0; i < pair[1].length; i++) {
            formData.append("images", pair[1][i]); // Append each file individually
          }
        } else {
          formData.append(pair[0], JSON.stringify(pair[1])); // Append other fields as strings
        }
      }

      // Submit formData to backend API
      const response = await axios.post("/api/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        router.push(`/properties/${response.data?.propertyId}`);
      } else {
        console.log("Failed to create property");
      }
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      encType="multipart/form-data"
    >
      <h2 className="text-3xl text-center font-semibold mb-6">Add Property</h2>

      <div className="mb-4">
        <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
          Property Type
        </label>
        <select
          {...register("type")}
          id="type"
          name="type"
          className="border rounded w-full py-2 px-3"
          required
        >
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <p>{errors.type?.message}</p>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Listing Name
        </label>
        <input
          {...register("name")}
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="eg. Beautiful Apartment In Miami"
        />
        <p className="text-sm text-red-500">{errors.name?.message}</p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          className="border rounded w-full py-2 px-3"
          rows={4}
          placeholder="Add an optional description of your property"
        ></textarea>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>
        <input
          {...register("location.street")}
          type="text"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Street"
        />
        <p className="text-sm text-red-500">
          {errors.location?.street?.message}
        </p>
        <input
          {...register("location.city")}
          type="text"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="City"
          required
        />
        <p className="text-sm text-red-500">{errors.location?.city?.message}</p>
        <input
          {...register("location.state")}
          type="text"
          id="state"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="State"
          required
        />
        <p className="text-sm text-red-500">
          {errors.location?.state?.message}
        </p>
        <input
          {...register("location.zipcode")}
          type="text"
          name="location.zipcode"
          className="border rounded w-full py-2 px-3 mb-2"
          placeholder="Zipcode"
        />
        <p className="text-sm text-red-500">
          {errors.location?.zipcode?.message}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full sm:w-1/3 pr-2">
          <label htmlFor="beds" className="block text-gray-700 font-bold mb-2">
            Beds
          </label>
          <input
            type="number"
            {...register("beds", { valueAsNumber: true })}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="w-full sm:w-1/3 px-2">
          <label htmlFor="baths" className="block text-gray-700 font-bold mb-2">
            Baths
          </label>
          <input
            type="number"
            {...register("baths", { valueAsNumber: true })}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="w-full sm:w-1/3 pl-2">
          <label
            htmlFor="square_feet"
            className="block text-gray-700 font-bold mb-2"
          >
            Square Feet
          </label>
          <input
            type="number"
            {...register("square_feet", { valueAsNumber: true })}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amenities</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_wifi"
              name="amenities"
              value="Wifi"
              className="mr-2"
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_kitchen"
              name="amenities"
              value="Full Kitchen"
              className="mr-2"
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_washer_dryer"
              name="amenities"
              value="Washer & Dryer"
              className="mr-2"
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_free_parking"
              name="amenities"
              value="Free Parking"
              className="mr-2"
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_pool"
              name="amenities"
              value="Swimming Pool"
              className="mr-2"
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_hot_tub"
              name="amenities"
              value="Hot Tub"
              className="mr-2"
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_24_7_security"
              name="amenities"
              value="24/7 Security"
              className="mr-2"
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_wheelchair_accessible"
              name="amenities"
              value="Wheelchair Accessible"
              className="mr-2"
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_elevator_access"
              name="amenities"
              value="Elevator Access"
              className="mr-2"
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_dishwasher"
              name="amenities"
              value="Dishwasher"
              className="mr-2"
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_gym_fitness_center"
              name="amenities"
              value="Gym/Fitness Center"
              className="mr-2"
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_air_conditioning"
              name="amenities"
              value="Air Conditioning"
              className="mr-2"
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_balcony_patio"
              name="amenities"
              value="Balcony/Patio"
              className="mr-2"
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_smart_tv"
              name="amenities"
              value="Smart TV"
              className="mr-2"
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              {...register("amenities")}
              type="checkbox"
              id="amenity_coffee_maker"
              name="amenities"
              value="Coffee Maker"
              className="mr-2"
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              {...register("rates.weekly", { valueAsNumber: true })}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              {...register("rates.monthly", { valueAsNumber: true })}
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              {...register("rates.nightly", { valueAsNumber: true })}
              className="border rounded w-full py-2 px-3"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Name
        </label>
        <input
          {...register("seller_info.name")}
          type="text"
          className="border rounded w-full py-2 px-3"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Email
        </label>
        <input
          {...register("seller_info.email")}
          type="email"
          className="border rounded w-full py-2 px-3"
          placeholder="Email address"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="block text-gray-700 font-bold mb-2"
        >
          Seller Phone
        </label>
        <input
          {...register("seller_info.phone")}
          type="tel"
          className="border rounded w-full py-2 px-3"
          placeholder="Phone"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple={true}
          required={true}
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setValue("images", Array.from(files)); // Use setValue to update "images" as an array of File objects
            }
          }}
        />
      </div>

      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Property
        </button>
      </div>
    </form>
  );
};

export default PropertyAddForm;
