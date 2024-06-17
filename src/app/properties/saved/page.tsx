"use client";

import { PropertyInterface } from "@/app/utils/interfaces";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBath, FaBed, FaMoneyBill, FaRuler, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [bookmarks, setBookmarks] = useState<PropertyInterface[]>([]);
  useEffect(() => {
    const fetchSavedProperties = async () => {
      const response = await axios.get("/api/properties/bookmarks");
      setBookmarks(response.data?.bookmarks);
    };

    fetchSavedProperties();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/properties/bookmarks/${id}`);
      if (response.status === 200) {
        const filteredBookmarks = bookmarks.filter(
          (property) => property._id !== id
        );
        setBookmarks(filteredBookmarks);
        toast.success("Bookmark removed successfully");
      }
    } catch (error: any) {
      toast.error("Could not remove bookmark");
    }
  };

  return (
    <section className="px-4">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookmarks.length === 0 ? (
            <h1>You donot have any property saved</h1>
          ) : (
            bookmarks.map((property) => (
              <div key={property._id} className="rounded-xl shadow-md relative">
                <button
                  onClick={() => handleDelete(property._id)}
                  className="absolute top-0 left-0 mt-2 ml-2 w-8 h-8 p-2 rounded-full bg-white flex items-center justify-center transition-colors hover:bg-red-100"
                >
                  <FaTrash className="text-red-600" />
                </button>
                <Image
                  src={property.images[0]}
                  alt=""
                  className="w-full object-cover rounded-t-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <div className="p-4">
                  <div className="text-left md:text-center lg:text-left mb-6">
                    <div className="text-gray-600">{property.type}</div>
                    <h3 className="text-xl font-bold">{property.name}</h3>
                  </div>
                  <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
                    $4,200/mo
                  </h3>

                  <div className="flex justify-center gap-4 text-gray-500 mb-4">
                    <p>
                      <FaBed className="inline-block" /> {property.beds}
                      <span className="md:hidden lg:inline">Beds</span>
                    </p>
                    <p>
                      <FaBath className="inline-block" /> {property.baths}
                      <span className="md:hidden lg:inline">Baths</span>
                    </p>
                    <p>
                      <FaRuler className="inline-block" />
                      {property.square_feet}{" "}
                      <span className="md:hidden lg:inline">sqft</span>
                    </p>
                  </div>

                  <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
                    {property.rates.weekly && (
                      <p className="flex items-center gap-1">
                        <FaMoneyBill />
                        {property.rates.weekly} Weekly
                      </p>
                    )}

                    {property.rates.monthly && (
                      <p className="flex items-center gap-1">
                        <FaMoneyBill />
                        {property.rates.monthly} Monthly
                      </p>
                    )}

                    {property.rates.nightly && (
                      <p className="flex items-center gap-1">
                        <FaMoneyBill />
                        {property.rates.nightly} Nightly
                      </p>
                    )}
                  </div>

                  <div className="border border-gray-100 mb-5"></div>

                  <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="flex align-middle gap-2 mb-4 lg:mb-0">
                      <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
                      <span className="text-orange-700">
                        {" "}
                        {property.location.state} {property.location.city}{" "}
                      </span>
                    </div>
                    <a
                      href={`/properties/${property._id}`}
                      className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
