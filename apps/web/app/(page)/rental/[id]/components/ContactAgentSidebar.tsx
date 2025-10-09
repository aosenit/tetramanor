"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhone, FaEnvelope, FaWhatsapp, FaUser } from "react-icons/fa";

interface ContactAgentSidebarProps {
  propertyName: string;
}

export default function ContactAgentSidebar({
  propertyName,
}: ContactAgentSidebarProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I am interested in ${propertyName}. Please contact me with more details.`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="sticky top-4 space-y-4">
      {/* Contact Agent Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Contact Agent
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full"
              required
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full"
              required
            />
          </div>

          <div>
            <Input
              type="tel"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full"
              required
            />
          </div>

          <div>
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full min-h-[100px]"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#116114] hover:bg-[#0d4d10] text-white"
          >
            Send Message
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Or contact us directly:</p>
          <div className="space-y-3">
            <a
              href="tel:+2348012345678"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#116114] transition-colors"
            >
              <FaPhone className="w-4 h-4 text-[#CD6115]" />
              <span>+234 801 234 5678</span>
            </a>
            <a
              href="mailto:rentals@tetramanor.com"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#116114] transition-colors"
            >
              <FaEnvelope className="w-4 h-4 text-[#CD6115]" />
              <span>rentals@tetramanor.com</span>
            </a>
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-gray-700 hover:text-[#25D366] transition-colors"
            >
              <FaWhatsapp className="w-4 h-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Property Alert Card */}
      <div className="bg-gradient-to-br from-[#116114] to-[#0d4d10] rounded-lg shadow-sm p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Get Property Alerts</h3>
        <p className="text-sm text-white/90 mb-4">
          Be the first to know about new properties matching your criteria.
        </p>
        <Button
          variant="outline"
          className="w-full bg-white text-[#116114] border-white hover:bg-white/90"
        >
          Subscribe to Alerts
        </Button>
      </div>
    </div>
  );
}

