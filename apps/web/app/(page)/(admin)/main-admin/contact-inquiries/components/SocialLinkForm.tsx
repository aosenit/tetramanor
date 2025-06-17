import {
  Plus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuInstagram } from "react-icons/lu";
import { BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { SlSocialLinkedin } from "react-icons/sl";

export default function Socials() {
  const socialPlatforms = [
    {
      icon: BsWhatsapp,
      name: "WhatsApp",
      placeholder: "Input url link",
    },
    {
      icon: SlSocialLinkedin,
      name: "LinkedIn",
      placeholder: "Input url link",
    },
    {
      icon: BsTwitterX,
      name: "X",
      placeholder: "Input url link",
    },
    {
      icon: LuInstagram,
      name: "Instagram",
      placeholder: "Input url link",
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-3 p-4">
      {socialPlatforms.map((platform, index) => {
        const IconComponent = platform.icon;
        return (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-100 rounded-lg p-3"
          >
            <IconComponent className="w-6 h-6 text-[#4C5560] flex-shrink-0" />
            <Input
              placeholder={platform.placeholder}
              className="border-none bg-transparent text-gray-600 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              size="sm"
              variant="ghost"
              className="p-1 h-auto text-[#4C5560] hover:text-[#4C5560]"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
