interface MapSectionProps {
  location?: string;
}

const MapSection = ({ location = "Eko Atlantic, Lagos, Nigeria" }: MapSectionProps) => {
  // Convert location to URL-friendly format
  const mapLocation = encodeURIComponent(location);
  
  return (
    <section className="container mx-auto px-4 lg:px-16 py-12">
      <h2 className="text-2xl font-bold mb-4">Location</h2>
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <iframe
          title="Location Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=3.4040,6.4160,3.4080,6.4200&layer=mapnik&marker=6.4180,3.4060`}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white text-gray-800 px-4 py-2 rounded shadow pointer-events-auto">
            <a
              href={`https://www.openstreetmap.org/search?query=${mapLocation}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Open Map
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
  