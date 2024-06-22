import PropertySearchForm from "../components/PropertySearchForm";
import Properties from "../components/Properties";

const PropertiesPage = async () => {
  return (
    <>
      <div className="bg-sageGreen p-5 rounded-b-3xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </div>
      <section className="px-4 py-6">
        <Properties />
      </section>
    </>
  );
};

export default PropertiesPage;
