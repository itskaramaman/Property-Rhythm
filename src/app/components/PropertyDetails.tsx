import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";

import { PropertyInterface } from "../utils/interfaces";

const PropertyDetails = ({ property }: { property: PropertyInterface }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></FaMapMarker>
          <p className="text-orange-700">
            {property.location.street}, {property.location.city},
            {property.location.state} {property.location.zipcode}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Rates & Options
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex text-center items-baseline justify-center gap-5 mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">
              <h2>Nightly</h2>
              {property.rates.nightly ? (
                <div className="font-semibold text-green-600">
                  ${property.rates.nightly}
                </div>
              ) : (
                <FaTimes className="mx-auto mt-1 text-red-700"></FaTimes>
              )}
            </div>
            <div className="text-gray-500 mr-2 font-bold">
              <h2>Weekly</h2>
              {property.rates.weekly ? (
                <div className="font-semibold text-green-600">
                  ${property.rates.weekly}
                </div>
              ) : (
                <FaTimes className="mx-auto mt-1 text-red-700"></FaTimes>
              )}
            </div>
            <div className="text-gray-500 mr-2 font-bold">
              <h2>Monthly</h2>
              {property.rates.monthly ? (
                <div className="font-semibold text-green-600">
                  ${property.rates.monthly}
                </div>
              ) : (
                <FaTimes className="mx-auto mt-1 text-red-700"></FaTimes>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p className="flex gap-1 items-center">
            <FaBed />
            <span className="text-sm">3</span>
            <span className="text-sm hidden sm:inline">Beds</span>
          </p>
          <p className="flex gap-1 items-baseline">
            <FaBath />
            <span className="text-sm">2</span>
            <span className="text-sm hidden sm:inline">Baths</span>
          </p>
          <p className="flex gap-1 items-baseline">
            <FaRulerCombined />
            <span className="text-sm">1,500</span>
            <span className="text-sm hidden sm:inline">sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4">
          This is a beautiful apartment located near the commons
        </p>
        <p className="text-gray-500 mb-4">
          We have a beautiful apartment located near the commons. It is a 2
          bedroom apartment with a full kitchen and bathroom. It is available
          for weekly or monthly rentals.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property.amenities.map((amenity: string, index: number) => (
            <li key={index}>
              <FaCheck className="text-green-600 mr-2 inline"></FaCheck>{" "}
              {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div id="map"></div>
      </div>
    </main>
  );
};

export default PropertyDetails;
