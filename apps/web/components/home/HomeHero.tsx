import Header from "@/app/(page)/portfolio/components/header";
import React, { useState } from "react";
import home from "@/assets/home/home.mp4";
import { useFetchData } from "@/hooks/useApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Property } from "@/app/(page)/portfolio/types";

const HomeHero = () => {
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    propertyType: string;
    location: string;
  }>({ propertyType: "", location: "" });
  const [visibleCount, setVisibleCount] = useState(2);
  const router = useRouter();

  const { data, isLoading, error } = useFetchData(
    searchParams.propertyType || searchParams.location
      ? `property?${searchParams.propertyType ? `propertyType=${encodeURIComponent(searchParams.propertyType)}` : ""}${searchParams.propertyType && searchParams.location ? "&" : ""}${searchParams.location ? `location=${encodeURIComponent(searchParams.location)}` : ""}`
      : ""
  );
  const properties: Property[] = data?.data?.items || [];

  const filteredProperties = location
    ? properties.filter((property) =>
        property.address?.toLowerCase().includes(location.toLowerCase())
      )
    : properties;

  return (
    <section className="relative h-[80vh] ">
      <Header />
      <video
        src={home}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="flex items-center justify-center">
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 h-[calc(80vh)] container mx-auto">
          <h1 className="text-white text-center text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-4 md:mb-6 mt-24 md:mt-0">
            Your Trusted Real Estate
            <br className="hidden md:block" /> Partner in Lagos
          </h1>
          <p className="text-white text-center text-base md:text-lg lg:text-2xl font-normal mb-6 md:mb-10 max-w-2xl">
            Modern, sustainable homes designed for better living and stronger
            communities.
          </p>
          <form
            className="flex flex-row items-stretch w-full max-w-3xl bg-black/70 overflow-hidden border border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              setSearchParams({ propertyType, location });
              setModalOpen(true);
            }}
          >
            {/* <div className="flex items-center py-3 px-4 md:px-6 border-r border-white/30">
              <label className="text-white text-sm md:text-base mr-2 whitespace-nowrap">
                Property type
              </label>
              <input
                type="text"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white text-sm md:text-base w-32"
              />
            </div> */}
            <div className="flex items-center py-3 px-4 md:px-6 border-r border-white/10 flex-1">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent outline-none text-white placeholder-white w-full text-sm md:text-base"
                placeholder="Enter location"
              />
            </div>
            <button
              type="submit"
              className="bg-white py-3 text-black font-semibold rounded-none px-6 md:px-8 text-sm md:text-base min-w-[120px] hover:bg-gray-200"
            >
              Browse
            </button>
          </form>
        </div>
      </div>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Available Properties</DialogTitle>
          </DialogHeader>
          <DialogClose asChild>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-black">
              &times;
            </button>
          </DialogClose>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg h-40 animate-pulse"
                />
              ))}
            </div>
          ) : error ? null : filteredProperties.length === 0 ? (
            <div className="py-8 text-center">No properties found.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProperties.slice(0, visibleCount).map((property) => (
                  <div
                    key={property.id}
                    className="bg-gray-100 rounded-lg overflow-hidden shadow flex flex-col"
                  >
                    <div className="relative w-full h-40">
                      <Image
                        src={
                          property.images?.find((img) => img.isPrimary)
                            ?.imageUrl ||
                          property.images?.[0]?.imageUrl ||
                          "/placeholder.png"
                        }
                        alt={property.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={false}
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-semibold text-lg mb-1">
                          {property.name}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {property.address}
                        </div>
                      </div>
                      <button
                        className="mt-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        onClick={() => {
                          setModalOpen(false);
                          router.push(
                            `/portfolio/view-property/${property.id}`
                          );
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {visibleCount < filteredProperties.length && (
                <button
                  className="mt-6 w-full bg-primary text-white font-semibold py-3 rounded hover:bg-primary/90 transition"
                  onClick={() => setVisibleCount((prev) => prev + 2)}
                >
                  Show More
                </button>
              )}
              <button
                className="mt-6 w-full bg-primary text-white font-semibold py-3 rounded hover:bg-primary/90 transition"
                onClick={() => {
                  setModalOpen(false);
                  router.push("/portfolio");
                }}
              >
                View More Properties
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HomeHero;
