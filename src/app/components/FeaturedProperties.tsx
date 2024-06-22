"use client";

import { useEffect, useState } from "react";
import { PropertyInterface } from "../utils/interfaces";
import axios from "axios";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
import Spinner from "./Spinner";

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState<
    PropertyInterface[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get("/api/properties/featured");
        if (response.status === 200) {
          setFeaturedProperties(response.data?.properties);
        }
      } catch (error: any) {
        console.log("Could not fetch featured properties", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Featured Properties
        </h2>
        {loading ? (
          <Spinner loading={true} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProperties.map((property: PropertyInterface) => (
              <FeaturedPropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
