const MapSection = () => {
    return (
      <section className="container mx-auto px-4 lg:px-16 py-12">
        <h2 className="text-2xl font-bold mb-4">Location</h2>
        <div className="relative w-full h-96 rounded-lg overflow-hidden">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.9529689121353!2d30.1234567!3d-1.9876543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca7edda987ed5%3A0xd4c2584b2a41c07f!2sAfrican%20Leadership%20University!5e0!3m2!1sen!2srw!4v1692300000000!5m2!1sen!2srw"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white text-gray-800 px-4 py-2 rounded shadow pointer-events-auto">
              <a
                href="https://maps.google.com?q=African+Leadership+University"
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
  