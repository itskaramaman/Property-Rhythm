import Image from "next/image";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

interface PropertyImagesProps {
  images: string[];
}

const PropertyImages = ({ images }: PropertyImagesProps) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        <Gallery>
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <div
                  ref={ref}
                  onClick={open}
                  className="object-cover h-[400px] mx-auto rounded-xl"
                >
                  <Image
                    src={images[0]}
                    alt=""
                    className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
                    width={1800}
                    height={400}
                    priority={true}
                  />
                </div>
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    images.length === 3 && index === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width={1000}
                    height={600}
                  >
                    {({ ref, open }) => (
                      <div
                        ref={ref}
                        onClick={open}
                        className="object-cover h-[400px] mx-auto rounded-xl"
                      >
                        <Image
                          src={image}
                          alt=""
                          width={1800}
                          height={400}
                          className="object-cover h-[400px] mx-auto rounded-xl cursor-pointer"
                          priority={true}
                        />
                      </div>
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </Gallery>
      </div>
    </section>
  );
};

export default PropertyImages;
