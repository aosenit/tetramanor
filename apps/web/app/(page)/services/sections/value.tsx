import { FaHome, FaHammer, FaUsers, FaKey, FaCheck } from "react-icons/fa";

export default function ValueSection() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-12 2xl:px-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[#0B0A0A] ">
          Where Vision Becomes
        </h1>
        <div className="flex items-center justify-center gap-2 mt-2">
          <h1 className="text-4xl font-bold tracking-tight text-[#0B0A0A] ">
            Value
          </h1>
          <img
            src="/image-in-text.png"
            alt="Building"
            className="h-10 w-16 object-cover rounded"
          />
          <h1 className="text-4xl font-bold tracking-tight text-[#0B0A0A] ">
            Through Expert Execution
          </h1>
        </div>

        <div className="mt-10 max-w-4xl mx-auto text-center">
          <p className="text-base text-[#0B0A0A]">
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

      {/* Architectural & Property Design Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-24 items-center mb-24 ">
        <div>
          <div className="inline-flex items-center justify-center p-3 bg-[#f0f0f0] rounded-full mb-6">
            <FaHome className="h-6 w-6 text-[#116114]" />
          </div>
          <h2 className="text-2xl font-semibold text-black mb-4">
            Architectural & Property Design
          </h2>
          <p className="text-[#0C0C0C] mb-6">
            We create functional, aesthetically pleasing, and sustainable
            spaces, ensuring every home or commercial property meets global
            design standards.
          </p>
          <div className="space-y-3 font-medium">
            <p className=" text-[#0C0C0C] font-normal">Our services include:</p>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Architectural planning & 3D modeling</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Interior & exterior space optimization</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Sustainable & energy-efficient designs</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Bespoke residential & commercial building design</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/services/Frame 2147225196.png"
            alt="Architectural Design"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Pre-Construction Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-24 items-center mb-24  ">
        <div className="order-2 md:order-1">
          <img
            src="/services/Frame 2147225196 (1).png"
            alt="Pre-Construction Services"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div className="order-1 md:order-2 self-end">
          <div className="inline-flex items-center justify-center p-3 bg-[#f0f0f0] rounded-full mb-6">
            <FaHammer className="h-6 w-6 text-[#116114]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0B0A0A] mb-4">
            Pre-Construction Services
          </h2>
          <p className="text-[#0b0a0a] mb-6">
            Strategic planning is key to a successful real estate project. We
            provide expert guidance to help investors and homeowners make
            informed decisions with:
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Feasibility studies & market analysis</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Land acquisition & due diligence</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Construction planning & cost estimation</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Regulatory & permit assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Development Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-24 items-center mb-24 ">
        <div>
          <div className="inline-flex items-center justify-center p-3 bg-[#f0f0f0] rounded-full mb-6">
            <FaUsers className="h-6 w-6 text-[#116114]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0B0A0A] mb-4">
            Property Development
          </h2>
          <p className="text-[#0b0a0a] mb-6">
            As one of the leading property development companies in Lagos, we
            specialize in residential and commercial real estate projects,
            offering:
          </p>
          <div className="space-y-3">
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Luxury & high-end property development</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Off-plan investment opportunities</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Custom home building</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>End-to-end project management</p>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/services/Frame 2147225196 (2).png"
            alt="Property Development"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Property Management Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-24 items-center mb-16">
        <div className="order-2 md:order-1">
          <img
            src="/services/Frame 2147225196 (3).png"
            alt="Property Management"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <div className="inline-flex items-center justify-center p-3 bg-[#f0f0f0] rounded-full mb-6">
            <FaKey className="h-6 w-6 text-[#116114]" />
          </div>
          <h2 className="text-3xl font-bold text-[#0B0A0A] mb-4">
            Property Management
          </h2>
          <p className="text-[#0b0a0a] mb-6">
            Long-term property value depends on expert maintenance and
            management.
          </p>
          <div className="space-y-3 mb-6">
            <p className="font-medium text-[#0b0a0a]">We provide:</p>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Rental property management for investors</p>
            </div>
            <div className="flex items-start">
              <FaCheck className=" text-[#0B0A0A] mr-3 text-sm mt-1 flex-shrink-0" />
              <p>Tenant and lease management solutions</p>
            </div>
          </div>
          <p className="text-[#0b0a0a] font-medium">
            At Tetramanor, we don't just build homes, we create valuable assets
            designed for <span className="font-bold">growth, comfort,</span> and{" "}
            <span className="font-bold">long-term prosperity</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
