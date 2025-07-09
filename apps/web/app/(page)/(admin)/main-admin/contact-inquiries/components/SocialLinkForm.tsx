import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LuInstagram } from "react-icons/lu";
import { BsTwitterX, BsWhatsapp } from "react-icons/bs";
import { SlSocialLinkedin } from "react-icons/sl";
import { useState, useEffect } from "react";

interface SocialLink {
  platform: string;
  url: string;
}

interface SocialLinkFormProps {
  socialLinks: SocialLink[];
  onSocialLinksChange: (links: SocialLink[]) => void;
  disabled?: boolean;
}

export default function Socials({
  socialLinks,
  onSocialLinksChange,
  disabled = false,
}: SocialLinkFormProps) {
  const [localSocialLinks, setLocalSocialLinks] =
    useState<SocialLink[]>(socialLinks);

  const socialPlatforms = [
    {
      icon: BsWhatsapp,
      name: "WhatsApp",
      placeholder: "Input url link",
      key: "whatsapp",
    },
    {
      icon: SlSocialLinkedin,
      name: "LinkedIn",
      placeholder: "Input url link",
      key: "linkedin",
    },
    {
      icon: BsTwitterX,
      name: "X",
      placeholder: "Input url link",
      key: "x",
    },
    {
      icon: LuInstagram,
      name: "Instagram",
      placeholder: "Input url link",
      key: "instagram",
    },
  ];

  // Update local state when props change
  useEffect(() => {
    setLocalSocialLinks(socialLinks);
  }, [socialLinks]);

  // Update parent when local state changes
  useEffect(() => {
    onSocialLinksChange(localSocialLinks);
  }, [localSocialLinks, onSocialLinksChange]);

  const handleAddLink = (platform: string) => {
    const existingLink = localSocialLinks.find(
      (link) => link.platform === platform
    );
    if (!existingLink) {
      setLocalSocialLinks((prev) => [...prev, { platform, url: "" }]);
    }
  };

  const handleRemoveLink = (platform: string) => {
    setLocalSocialLinks((prev) =>
      prev.filter((link) => link.platform !== platform)
    );
  };

  const handleUrlChange = (platform: string, url: string) => {
    setLocalSocialLinks((prev) =>
      prev.map((link) => (link.platform === platform ? { ...link, url } : link))
    );
  };

  const getLinkForPlatform = (platform: string) => {
    return localSocialLinks.find((link) => link.platform === platform);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3 p-4">
      {socialPlatforms.map((platform, index) => {
        const IconComponent = platform.icon;
        const existingLink = getLinkForPlatform(platform.key);

        return (
          <div
            key={index}
            className="flex items-center gap-3 bg-gray-100 rounded-lg p-3"
          >
            <IconComponent className="w-6 h-6 text-[#4C5560] flex-shrink-0" />
            {existingLink ? (
              <>
                <Input
                  placeholder={platform.placeholder}
                  value={existingLink.url}
                  onChange={(e) =>
                    handleUrlChange(platform.key, e.target.value)
                  }
                  disabled={disabled}
                  className="border-none bg-transparent text-gray-600 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveLink(platform.key)}
                  disabled={disabled}
                  className="p-1 h-auto text-[#4C5560] hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Input
                  placeholder={platform.placeholder}
                  disabled={true}
                  className="border-none bg-transparent text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAddLink(platform.key)}
                  disabled={disabled}
                  className="p-1 h-auto text-[#4C5560] hover:text-[#4C5560]"
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
