import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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
      {/* <div className="flex items-center gap-2 mb-6">
        <Button variant="secondary" size="sm" className="rounded px-4">
          All
        </Button>
        <Button variant="ghost" size="sm" className="rounded px-4">
          Photos
        </Button>
        <Button variant="ghost" size="sm" className="rounded px-4">
          Videos
        </Button>
      </div> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {gallery && gallery.length > 0 ? (
          gallery.map((img) => (
            <div
              key={img.id}
              className="rounded-lg overflow-hidden border bg-gray-50 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => handleImageClick(img)}
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

      {/* Image Preview Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-white rounded-lg shadow-lg border-none">
          <div className="relative">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Image */}
            {selectedImage && (
              <div className="relative">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.name || "Property image"}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                {/* Image info */}
                {selectedImage.name && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-medium text-lg">
                      {selectedImage.name}
                    </h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
