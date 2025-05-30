import { Button } from "@/components/ui/button";

export function PropertyLocation() {
  return (
    <div className="relative h-[300px] rounded-lg overflow-hidden border">
      <div className="absolute inset-0 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.0738456444187!2d3.3751114!3d6.5052837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c0f7e0a7c3d%3A0x7a1de11d89a7f2fc!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1653308145517!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="absolute bottom-4 right-4">
        <Button size="sm" variant="secondary">
          Open Map
        </Button>
      </div>
    </div>
  );
}
