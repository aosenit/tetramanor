"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaUser, FaEnvelope, FaPhone, FaDollarSign, FaBuilding } from "react-icons/fa";

interface InvestmentDetailsModalProps {
  investment: any | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestmentDetailsModal({ 
  investment, 
  isOpen, 
  onClose 
}: InvestmentDetailsModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    investmentAmount: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!investment) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/investment-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          investmentId: investment.id,
          investmentType: investment.investmentType,
          projectName: investment.projectName,
          minAmount: investment.minAmount,
          estimatedROI: investment.estimatedROI,
          duration: investment.duration
        }),
      });

      if (response.ok) {
        // Show success message
        alert('Investment request submitted successfully! Our team will contact you within 24-48 hours to discuss your investment goals.');
        onClose();
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          investmentAmount: "",
          message: ""
        });
      } else {
        throw new Error('Failed to submit investment request');
      }
    } catch (error) {
      console.error('Error submitting investment request:', error);
      alert('Failed to submit investment request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Investment Inquiry -{" "}
            {investment.projectName || "Investment Opportunity"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Investor Details Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number *
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="investmentAmount"
                  className="text-sm font-medium text-gray-700"
                >
                  Investment Amount *
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="investmentAmount"
                    name="investmentAmount"
                    type="number"
                    required
                    min={investment.minAmount || 50000000}
                    value={formData.investmentAmount}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder={`Minimum: ${formatCurrency(investment.minAmount || 50000000)}`}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tell us more about your investment goals or any questions you have..."
              />
            </div>

            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                What happens next?
              </h4>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Our investment team will review your inquiry</li>
                <li>• You'll receive a call within 24-48 hours</li>
                <li>
                  • We'll discuss your investment goals and risk tolerance
                </li>
                <li>
                  • Detailed project information and documentation will be
                  shared
                </li>
                <li>• Investment terms and next steps will be finalized</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Investment Request"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
