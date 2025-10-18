import React from "react";
// import eight from "@/assets/about/icons/eight.webp";
// import nine from "@/assets/about/icons/nine.webp";
// import ten from "@/assets/about/icons/ten.webp";
// import eleven from "@/assets/about/icons/eleven.webp";
import { FaShieldAlt, FaHandshake, FaHome } from "react-icons/fa";

// const features = [
//   {
//     icon: eight,
//     label: "Reasonable prices",
//   },
//   {
//     icon: nine,
//     label: "Flexible payment",
//   },
//   {
//     icon: ten,
//     label: "Verified listings",
//   },
//   {
//     icon: eleven,
//     label: "24/7 support",
//   },
//   {
//     icon: ten,
//     label: "Seamless onboarding",
//   },
// ];

const promises = [
  {
    icon: FaShieldAlt,
    title: "Uncompromising Standards",
    text: "We will not compromise our standards for any reason whatsoever.",
  },
  {
    icon: FaHandshake,
    title: "Transparent Pricing",
    text: "We will not extort our clients to make a profit.",
  },
  {
    icon: FaHome,
    title: "Quality Assurance",
    text: "We will not sell to our clients spaces we are not willing to live in ourselves.",
  },
];

function TetramoreCode() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            The Tetramanor Code
          </h2>
          <div className="w-16 h-0.5 bg-[#CD6115] mx-auto mb-6"></div>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Our unwavering commitment to excellence and integrity in every
            transaction
          </p>
        </div>

        {/* Promise Cards - Clean & Professional */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {promises.map((promise, index) => {
              const Icon = promise.icon;
              return (
                <div
                  key={index}
                  className="group bg-white border border-gray-200 rounded-lg p-8 hover:border-[#CD6115] transition-all duration-300 hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#CD6115]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#CD6115] transition-colors duration-300">
                    <Icon className="text-[#CD6115] text-xl group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {promise.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {promise.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-12">
            What Sets Us Apart
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#CD6115]/10 transition-colors duration-300">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default TetramoreCode;
