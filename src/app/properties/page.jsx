import PropertyCard from "@/app/components/PropertyCard";
import { fetchProperties } from "../utils/request";
import PropertySearchForm from "../components/PropertySearchForm";

const PropertiesPage = async () => {
  const properties = await fetchProperties();
  return (
    <>
      <div className="bg-sageGreen p-5 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </div>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
