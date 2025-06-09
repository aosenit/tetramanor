import Image from "next/image";
import placeholder from "@/assets/placeholder.svg";

export function PropertyGallery() {
  return (
    <div className="flex flex-col lg:grid  lg:grid-cols-4 gap-2 min-h-[600px] lg:h-[400px] ">
      <div className="col-span-3 row-span-2 relative rounded-l-lg overflow-hidden">
        <Image
          src={placeholder}
          alt="Property main view"
          height={400}
          width={400}
          className="object-cover w-full  h-[400px] lg:min-h-[400px] "
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-rows-3 gap-2 h-full ">
        <div className="relative rounded-tr-lg overflow-hidden">
          <Image
            src={placeholder}
            alt="Property detail"
            height={160}
            width={200}
            className="object-cover w-full h-[160px] "
          />
        </div>

        <div className="relative rounded-tr-lg overflow-hidden">
          <Image
            src={placeholder}
            alt="Property detail"
            height={160}
            width={200}
            className="object-cover w-full h-[160px] "
          />
        </div>
        <div className="relative rounded-br-lg overflow-hidden ">
          <Image
            src={placeholder}
            alt="Property detail"
            height={160}
            width={200}
            className="object-cover w-full h-[160px] "
          />

          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white font-medium">5+ Photos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
