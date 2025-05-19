import Image from "next/image";
import shelf from "../../../../public/services/shelf.png"
import balcony from "../../../../public/services/balcony.png"
import sittingroom from "../../../../public/services/sittingroom.png"
import dining from "../../../../public/services/dining.png"
import sidetable from "../../../../public/services/sidetable.png"


export default function InteriorShowcase() {
  return (
    <section className="py-16 bg-[#f3f7f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#eb8a43] font-medium uppercase tracking-wider mb-2">
            SHOWCASE
          </p>
          <h2 className="text-4xl font-bold text-[#000000] sm:text-5xl">
            Explore Our 3D Interior Designs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="overflow-hidden rounded-lg shadow-md">
            <Image
              src={shelf}
              alt="Modern bookshelf and cabinet design"
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <Image
              src={balcony}
              alt="Glass wall living space with outdoor views"
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <Image
              src={sittingroom}
              alt="Living room with yellow sofa and large windows"
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <Image
              src={dining}
              alt="Dining area with framed artwork gallery wall"
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <Image
              src={sidetable}
              alt="Green console table with botanical prints"
              className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
