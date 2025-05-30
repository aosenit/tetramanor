import {
  Waves,
  BookOpen,
  Wind,
  Flower2,
  ShieldCheck,
  ArrowUpDown,
  Car,
  ShipWheelIcon as Wheelchair,
  Dog,
  Flame,
  Building2,
} from "lucide-react";

interface PropertyFeaturesProps {
  features: string[];
}

export function PropertyFeatures({ features }: PropertyFeaturesProps) {
  const getIcon = (feature: string) => {
    switch (feature) {
      case "Swimming Pool":
        return <Waves className="h-5 w-5 text-green-600" />;
      case "Study/Office":
        return <BookOpen className="h-5 w-5 text-green-600" />;
      case "Air Conditioning":
        return <Wind className="h-5 w-5 text-green-600" />;
      case "Garden":
        return <Flower2 className="h-5 w-5 text-green-600" />;
      case "Security System":
        return <ShieldCheck className="h-5 w-5 text-green-600" />;
      case "Elevator":
        return <ArrowUpDown className="h-5 w-5 text-green-600" />;
      case "Parking":
        return <Car className="h-5 w-5 text-green-600" />;
      case "Wheelchair Access":
        return <Wheelchair className="h-5 w-5 text-green-600" />;
      case "Pets Allowed":
        return <Dog className="h-5 w-5 text-green-600" />;
      case "Fireplace":
        return <Flame className="h-5 w-5 text-green-600" />;
      case "Balcony":
        return <Building2 className="h-5 w-5 text-green-600" />;
      default:
        return <div className="h-5 w-5 bg-green-100 rounded-full" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {features.map((feature) => (
        <div key={feature} className="flex items-center gap-2">
          {getIcon(feature)}
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
}
