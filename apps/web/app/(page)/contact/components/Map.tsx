const officeAddress = "13, Random Address, Ikeja, Lagos State.";
const mapLocation = encodeURIComponent(officeAddress);
const MapSection = () => {
    return (
      <section className="container mx-auto px-4 lg:px-16 py-12">
        <h2 className="text-2xl font-bold mb-4">Location of Our Offices</h2>
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <iframe
            title="Location Map"
            src={`https://maps.google.com/maps?q=${mapLocation}&t=m&z=15&output=embed&iwloc=near`}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white text-gray-800 px-4 py-2 rounded shadow pointer-events-auto">
              <a
                href={`https://maps.google.com/?q=${mapLocation}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Open Map
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Office Address</h3>
          <p className="text-gray-600 text-sm">{officeAddress}</p>
        </div>
      </section>
    );
  };
  
  export default MapSection;
  