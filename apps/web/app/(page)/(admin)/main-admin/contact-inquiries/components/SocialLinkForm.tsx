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
      defaultUrl: "https://wa.me/",
    },
    {
      icon: SlSocialLinkedin,
      name: "LinkedIn",
      placeholder: "Input url link",
      key: "linkedin",
      defaultUrl: "https://linkedin.com/in/",
    },
    {
      icon: BsTwitterX,
      name: "X",
      placeholder: "Input url link",
      key: "x",
      defaultUrl: "https://x.com/",
    },
    {
      icon: LuInstagram,
      name: "Instagram",
      placeholder: "Input url link",
      key: "instagram",
      defaultUrl: "https://instagram.com/",
    },
  ];

  // Update local state when props change (only on initial load)
  useEffect(() => {
    setLocalSocialLinks(socialLinks);
  }, []); // Only run once on mount

  const handleAddLink = (platform: string) => {
    const existingLink = localSocialLinks.find(
      (link) => link.platform === platform
    );
    if (!existingLink) {
      const platformConfig = socialPlatforms.find((p) => p.key === platform);
      const defaultUrl = platformConfig?.defaultUrl || "";
      const newLinks = [...localSocialLinks, { platform, url: defaultUrl }];
      setLocalSocialLinks(newLinks);
      onSocialLinksChange(newLinks);
    }
  };

  const handleRemoveLink = (platform: string) => {
    const newLinks = localSocialLinks.filter(
      (link) => link.platform !== platform
    );
    setLocalSocialLinks(newLinks);
    onSocialLinksChange(newLinks);
  };

  const handleUrlChange = (platform: string, url: string) => {
    const newLinks = localSocialLinks.map((link) =>
      link.platform === platform ? { ...link, url } : link
    );
    setLocalSocialLinks(newLinks);
    onSocialLinksChange(newLinks);
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
            className="flex items-center gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-gray-300 transition-colors"
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
                  className="flex-1 border-none bg-transparent text-gray-700 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#116114] focus-visible:ring-offset-0 rounded-md px-2 py-1"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveLink(platform.key)}
                  disabled={disabled}
                  className="p-1 h-auto text-[#4C5560] hover:text-red-500 hover:bg-red-50 rounded-md z-10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1 relative">
                  <Input
                    placeholder={platform.placeholder}
                    disabled={true}
                    className="w-full border-none bg-transparent text-gray-400 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-md px-2 py-1 pointer-events-none"
                  />
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleAddLink(platform.key)}
                  disabled={disabled}
                  className="p-1 h-auto text-[#4C5560] hover:text-[#116114] hover:bg-green-50 rounded-md z-10 relative"
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
