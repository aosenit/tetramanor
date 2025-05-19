import Image from "next/image";
import { FaCheck } from "react-icons/fa";

export default function WhyInvest() {
  return (
    <div className="container mx-auto px-4 lg:px-16 py-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tetramanor-QdhAfPuTiJPYBS1RRFwNh4QRSjdjVk.png"
            alt="TM HighGardens luxury residential building"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-[#0b0a0a]">
            Why Invest in TM HighGardens?
          </h2>

          <div className="space-y-8">
            <div className="flex items-start">
              <div className="mt-1 mr-4 flex-shrink-0">
                <FaCheck className="h-5 w-5 text-[#116114]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Flexible Payment Plan
                </h3>
                <p className="text-[#5c5c5c]">
                  Convenient 4-year installment structure
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 flex-shrink-0">
                <FaCheck className="h-5 w-5 text-[#116114]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Guaranteed ROI</h3>
                <p className="text-[#5c5c5c]">
                  Up to 20-25% annual returns with high rental and capital
                  appreciation potential
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 flex-shrink-0">
                <FaCheck className="h-5 w-5 text-[#116114]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">
                  Exclusive Discounts
                </h3>
                <p className="text-[#5c5c5c]">
                  Special offers for early investors
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-4 flex-shrink-0">
                <FaCheck className="h-5 w-5 text-[#116114]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Prime Location</h3>
                <p className="text-[#5c5c5c]">
                  Situated in the prestigious Eko Atlantic City
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
