import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import a from "@/assets/services/icons/a.webp"
import b from "@/assets/services/icons/b.webp"
import c from "@/assets/services/icons/c.webp"
import d from "@/assets/services/icons/d.webp"
import two from "@/assets/services/two.webp"
import three from "@/assets/services/three.webp"
import four from "@/assets/services/four.webp"
import ive from "@/assets/services/ive.webp"
import six from "@/assets/services/six.webp"
export default function ValueSection() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 sm:px-6 lg:px-12 2xl:px-16">
      <div className="text-center mb-8 md:mb-16">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-[#0B0A0A]">
          Where Vision Becomes
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-[#0B0A0A]">
            Value
          </h1>
          <Image
            src={two}
            alt="Building"
            className="h-6 md:h-8 w-16 md:w-20 object-cover rounded"
            width={80}
            height={32}
          />
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-[#0B0A0A]">
            Through Expert Execution
          </h1>
        </div>

        <div className="mt-6 md:mt-10 max-w-4xl mx-auto text-center">
          <p className="text-sm md:text-base text-[#0B0A0A]">
            At Tetramanor, we provide end-to-end real estate services, helping
            individuals and businesses{" "}
            <span className="font-semibold">invest, build,</span> and{" "}
            <span className="font-semibold">manage</span> properties with ease.
            From architectural design to property development and management, we
            deliver{" "}
            <span className="font-semibold">
              high-quality, innovative, and cost-effective solutions
            </span>{" "}
            tailored to meet the needs of modern homeowners and investors.
          </p>
        </div>
      </div>

      {/* Service sections with consistent sizing */}
      <div className="space-y-16 md:space-y-24">
        {/* Architectural & Property Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 2xl:gap-24">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center justify-start">
              <Image
                src={a}
                alt="Hammer"
                className="h-8 w-8"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-black mb-4">
                Architectural & Property Design
              </h2>
              <p className="text-sm md:text-base text-[#0C0C0C] mb-6">
                We create functional, aesthetically pleasing, and sustainable
                spaces, ensuring every home or commercial property meets global
                design standards.
              </p>
              <div className="space-y-3">
                <p className="text-sm md:text-base text-[#0C0C0C] font-normal">Our services include:</p>
                <div className="space-y-2">
                  {[
                    "Architectural planning & 3D modeling",
                    "Interior & exterior space optimization",
                    "Sustainable & energy-efficient designs",
                    "Bespoke residential & commercial building design"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <FaCheck className="text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
                      <p className="text-sm md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-full min-h-[600px]">
            <Image
              src={three}
              alt="Architectural Design"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Pre-Construction Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 2xl:gap-24 min-h-[600px]">
          <div className="order-2 md:order-1 relative h-full min-h-[600px]">
            <Image
              src={four}
              alt="Pre-Construction Services"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center space-y-6 p-6">
            <div className="inline-flex items-center justify-start">
              <Image
                src={b}
                alt="Hammer"
                className="h-8 w-8"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-[#0B0A0A] mb-4">
                Pre-Construction Services
              </h2>
              <p className="text-sm md:text-base text-[#0b0a0a] mb-6">
                Strategic planning is key to a successful real estate project. We
                provide expert guidance to help investors and homeowners make
                informed decisions with:
              </p>
              <div className="space-y-2">
                {[
                  "Feasibility studies & market analysis",
                  "Land acquisition & due diligence",
                  "Construction planning & cost estimation",
                  "Regulatory & permit assistance"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <FaCheck className="text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
                    <p className="text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Property Development */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 2xl:gap-24 min-h-[600px]">
          <div className="flex flex-col justify-center space-y-6 p-6">
            <div className="inline-flex items-center justify-start">
              <Image
                src={c}
                alt="Hammer"
                className="h-8 w-8"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-[#0B0A0A] mb-4">
                Property Development
              </h2>
              <p className="text-sm md:text-base text-[#0b0a0a] mb-6">
                As one of the leading property development companies in Lagos, we
                specialize in residential and commercial real estate projects,
                offering:
              </p>
              <div className="space-y-2">
                {[
                  "Luxury & high-end property development",
                  "Off-plan investment opportunities",
                  "Custom home building",
                  "End-to-end project management"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <FaCheck className="text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
                    <p className="text-sm md:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-full min-h-[600px]">
            <Image
              src={ive}
              alt="Property Development"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Property Management */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 2xl:gap-24 min-h-[600px]">
          <div className="order-2 md:order-1 relative h-full min-h-[600px]">
            <Image
              src={six}
              alt="Property Management"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 md:order-2 flex flex-col justify-center space-y-6 p-6">
            <div className="inline-flex items-center justify-start">
              <Image
                src={d}
                alt="Hammer"
                className="h-8 w-8"
                width={32}
                height={32}
              />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-[#0B0A0A] mb-4">
                Property Management
              </h2>
              <p className="text-sm md:text-base text-[#0b0a0a] mb-6">
                Long-term property value depends on expert maintenance and
                management.
              </p>
              <div className="space-y-3 mb-6">
                <p className="font-medium text-[#0b0a0a] text-sm md:text-base">We provide:</p>
                <div className="space-y-2">
                  {[
                    "Rental property management for investors",
                    "Tenant and lease management solutions"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <FaCheck className="text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
                      <p className="text-sm md:text-base">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm md:text-base text-[#0b0a0a] font-medium">
                At Tetramanor, we don't just build homes, we create valuable assets
                designed for <span className="font-bold">growth, comfort,</span> and{" "}
                <span className="font-bold">long-term prosperity</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
