"use client";

import { PropertyInterface } from "@/app/utils/interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyCard from "@/app/components/PropertyCard";
import Link from "next/link";
import axios from "axios";
import PropertySearchForm from "@/app/components/PropertySearchForm";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  const [searchedProperties, setSearchedProperties] = useState<
    PropertyInterface[]
  >([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const response = await axios.get(
        `/api/properties/search?location=${location}&propertyType=${propertyType}`
      );
      if (response.data?.properties) {
        setSearchedProperties(response.data?.properties);
      }
    };

    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <div className="bg-sageGreen p-5 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </div>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="text-green-700 hover:underline mb-2 flex items-center gap-1"
          >
            <FaArrowAltCircleLeft /> <span>Back to properties</span>
          </Link>
          <h1 className="text-3xl">Search Results</h1>
          <hr className="my-5" />
          {searchedProperties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResults;
