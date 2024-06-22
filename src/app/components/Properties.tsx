"use client";

import { useState, useEffect } from "react";
import { fetchProperties } from "../utils/request";
import { PropertyInterface } from "../utils/interfaces";
import PropertyCard from "./PropertyCard";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState<PropertyInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const handlePageData = async () => {
      try {
        const { properties: fetchedProperties, total } = await fetchProperties(
          page,
          pageSize
        );
        setProperties(fetchedProperties);
        setTotalItems(total);
      } catch (error: any) {
        toast.error("Could not load properties");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    handlePageData();
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <Spinner loading={true} />;
  return (
    <div className="container-xl lg:container m-auto px-4 py-6">
      {properties.length === 0 ? (
        <p>No properties found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Properties;
