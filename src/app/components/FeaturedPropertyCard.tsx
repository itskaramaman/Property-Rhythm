import Image from "next/image";
import Link from "next/link";
import {
  FaMapMarker,
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
} from "react-icons/fa";
import { PropertyInterface } from "../utils/interfaces";

const FeaturedPropertyCard = ({
  property,
}: {
  property: PropertyInterface;
}) => {
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/wk`;
    }
  };
  return (
    <div className="rounded-xl shadow-md relative md:flex md:justify-between">
      <Image
        src={property.images[0]}
        alt=""
        height={0}
        width={0}
        sizes="100vw"
        className="w-full md:w-1/2 h-auto rounded-t-xl border-r-8"
      />
      <div className="p-4 flex flex-col justify-between">
        <div className="text-left md:text-center lg:text-left mb-6 flex justify-between">
          <div>
            <div className="text-gray-600">{property.type}</div>
            <h3 className="text-xl">{property.name}</h3>
          </div>
          <FaStar className="text-yellow-300" />
        </div>
        <div className="flex justify-center gap-4 text-gray-500 mb-4 text-sm">
          <p>
            <FaBed className="inline mr-1"></FaBed> {property.beds}{" "}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline mr-1"></FaBath> {property.baths}{" "}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-1"></FaRulerCombined>
            {property.square_feet}{" "}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>
        <hr className="my-2" />
        <div className="flex md:flex-col lg:flex-row justify-between items-center mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className=" mt-1 fa-solid fa-location-dot text-lg text-rustBrown"></FaMapMarker>
            <span className="text-rustBrown">
              {" "}
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
