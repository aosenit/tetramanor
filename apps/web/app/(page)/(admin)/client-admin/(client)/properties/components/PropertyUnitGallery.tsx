import Image from "next/image";
import { Button } from "@/components/ui/button";

interface GalleryImage {
  id: string;
  imageUrl: string;
  name?: string;
  type?: string; // 'photo' | 'video' | etc.
}

interface PropertyUnitGalleryProps {
  gallery: GalleryImage[];
}

export default function PropertyUnitGallery({
  gallery,
}: PropertyUnitGalleryProps) {
  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Gallery</h2>
          <p className="text-gray-500 text-sm">
            Visual records of your property's progress and features
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-6">
        <Button variant="secondary" size="sm" className="rounded px-4">
          All
        </Button>
        <Button variant="ghost" size="sm" className="rounded px-4">
          Photos
        </Button>
        <Button variant="ghost" size="sm" className="rounded px-4">
          Videos
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {gallery && gallery.length > 0 ? (
          gallery.map((img) => (
            <div
              key={img.id}
              className="rounded-lg overflow-hidden border bg-gray-50"
            >
              <Image
                src={img.imageUrl}
                alt={img.name || "Property image"}
                width={400}
                height={300}
                className="object-cover w-full h-48"
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-12">
            No assets available
          </div>
        )}
      </div>
    </div>
  );
}
