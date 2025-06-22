interface MapSectionProps {
  location?: string;
  propertyName?: string;
}

const MapSection = ({
  location = "Lagos, Nigeria",
  propertyName = "Property",
}: MapSectionProps) => {
  // Convert location to URL-friendly format for Google Maps
  const mapLocation = encodeURIComponent(location);

  return (
    <section className="container mx-auto px-4 lg:px-16 py-12">
      <h2 className="text-2xl font-bold mb-4">Location</h2>
      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          title={`${propertyName} Location Map`}
          src={`https://maps.google.com/maps?q=${mapLocation}&t=m&z=15&output=embed&iwloc=near`}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg pointer-events-auto border border-gray-200">
            <a
              href={`https://maps.google.com/?q=${mapLocation}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-700 font-medium text-sm flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-2">Property Address</h3>
        <p className="text-gray-600 text-sm">{location}</p>
      </div>
    </section>
  );
};

export default MapSection;
