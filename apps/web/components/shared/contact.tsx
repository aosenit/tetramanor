import Image from "next/image";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section className="relative w-full h-[337px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/services/contact.jpg"
        alt="Aerial view of residential development"
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 bg-black/40">
        <h2 className="text-4xl  font-bold text-white mb-6">
          Got Questions? Let's Talk.
        </h2>
        <p className="text-white text-base md:text-lg max-w-3xl mb-8">
          We're always happy to hear from you. Whether you're ready to own a
          home, need more info about a project, or just want to explore your
          options — reach out and let's make it happen.
        </p>
        <Link
          href="/contact"
          className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-8 rounded-md transition-colors duration-300"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
