"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDefault from "@/app/assets/images/profile.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { PropertyInterface } from "../utils/interfaces";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [properties, setProperties] = useState<PropertyInterface[]>([]);

  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) return;
    async function getProfile() {
      const response = await axios.get(`/api/profile?userId=${userId}`);
      setProperties(response?.data?.properties);
    }

    getProfile();
  }, [userId]);

  const handleDelete = async (propertyId: string) => {
    try {
      const response = await axios.delete(`/api/properties/${propertyId}`);

      if (response.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );
        setProperties(updatedProperties);
      }
    } catch (error) {
      console.log("Could not delete property");
    }
  };

  return (
    <section className={`bg-blue-50`}>
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                  sizes="100vw"
                />
              </div>
              <h2 className="text-xl mb-4">
                <span className="font-bold block">Name: </span> {profileName}
              </h2>
              <h2 className="text-xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties.map((property) => (
                <div key={property._id} className="mb-10">
                  <Link href={`/properties/${property._id}`}>
                    <Image
                      className="h-32 w-full rounded-md object-cover"
                      src={property.images[0]}
                      alt="Property 1"
                      width={0}
                      height={0}
                      sizes="100vw"
                    />
                  </Link>
                  <div className="mt-2">
                    <p className="text-lg font-semibold">{property.name}</p>
                    <p className="text-gray-600">
                      Address: {property.location.street},{" "}
                      {property.location.state}
                    </p>
                  </div>
                  <div className="mt-2">
                    <Link
                      href={`/properties/${property._id}/edit`}
                      className="bg-green-700 text-white px-3 py-3 rounded-md mr-2 hover:bg-green-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
