import Image from "next/image";

export function PropertyGallery() {
  return (
    <div className="grid grid-cols-4 gap-2 h-[400px]">
      <div className="col-span-3 row-span-2 relative rounded-l-lg overflow-hidden">
        <Image
          src="/images/property-main.jpg"
          alt="Property main view"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative rounded-tr-lg overflow-hidden">
        <Image
          src="/images/property-detail-1.jpg"
          alt="Property detail"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative rounded-br-lg overflow-hidden group">
        <Image
          src="/images/property-detail-2.jpg"
          alt="Property detail"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white font-medium">5+ Photos</span>
        </div>
      </div>
    </div>
  );
}
