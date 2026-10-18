import Image from "next/image";
import {
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

const whatsappMessage =
  "नमस्ते Kabadi Baba, मुझे गोरखपुर में कबाड़ पिकअप शेड्यूल करना है।";

const whatsappUrl = `https://wa.me/917377788810?text=${encodeURIComponent(
  whatsappMessage
)}`;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-[#f0fdf4] via-white to-[#ecfdf5]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
        {/* LEFT CONTENT */}
        <div className="relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-xs font-bold text-green-800 shadow-sm ring-1 ring-green-200 sm:px-5 sm:text-sm">
            <ShieldCheck size={18} className="text-green-600" />
            Gorakhpur&apos;s Trusted Scrap Dealer
          </div>

          {/* Main SEO Heading */}
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-6xl">
            Kabadi Baba
            <br />
            <span className="text-green-600">Sell Scrap Online</span>
            <br />
            <span className="text-gray-900">Free Pickup in Gorakhpur</span>
          </h1>

          {/* Conversion-focused Benefit */}
          <p className="mt-4 max-w-2xl text-xl font-bold leading-8 text-gray-800 sm:text-2xl">
            100% सही डिजिटल वजन और तुरंत UPI पेमेंट — सिर्फ 1 कॉल पर पिकअप
          </p>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 md:text-xl">
            घर बैठे अपना पुराना newspaper, books, cardboard, plastic, iron,
            steel, copper, aluminium, e-waste और अन्य कबाड़ बेचें।
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
            {/* Primary CTA */}
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-1 hover:bg-green-700 sm:px-8 sm:py-4"
            >
              <Truck size={20} />
              Book Scrap Pickup
            </a>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp with Kabadi Baba"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-green-600 bg-white px-6 py-3.5 font-bold text-green-700 transition duration-300 hover:-translate-y-1 hover:bg-green-50 sm:px-8 sm:py-4"
            >
              <svg
                viewBox="0 0 32 32"
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.54 1.74 6.53L3 29l6.66-1.7A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3Zm0 23.7c-2.02 0-4-.54-5.73-1.57l-.41-.24-3.95 1.01 1.05-3.84-.27-.42A10.67 10.67 0 1 1 16 26.7Zm5.86-7.98c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.52-.16-.74.16-.22.32-.84 1.05-1.03 1.27-.19.22-.38.24-.7.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.57-1.87-1.75-2.19-.18-.32-.02-.49.14-.65.14-.14.32-.38.49-.57.16-.19.22-.32.32-.54.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.87.69.79.25 1.5.21 2.06.13.63-.09 1.9-.78 2.17-1.54.27-.76.27-1.41.19-1.54-.08-.13-.3-.21-.62-.37Z" />
              </svg>
              WhatsApp
            </a>

            {/* Call CTA */}
            <a
              href="tel:+917377788810"
              aria-label="Call Kabadi Baba now"
              className="call-now-pulse relative inline-flex items-center gap-2 rounded-xl border-2 border-green-600 bg-white px-5 py-3.5 font-bold text-green-700 transition duration-300 hover:-translate-y-1 hover:bg-green-50 hover:text-green-800 sm:px-7 sm:py-4"
            >
              <span className="call-phone-wrap" aria-hidden="true">
                <span className="call-wave call-wave-left call-wave-left-outer" />
                <span className="call-wave call-wave-left call-wave-left-inner" />
                <span className="call-wave call-wave-right call-wave-right-inner" />
                <span className="call-wave call-wave-right call-wave-right-outer" />
                <span className="call-ray call-ray-center" />
                <span className="call-ray call-ray-left" />
                <span className="call-ray call-ray-right" />
                <Phone size={22} className="call-ring-icon" />
              </span>
              Call Now
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
          <div className="absolute -inset-3 rounded-[2rem] bg-green-200/50 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-green-100">
            <div className="relative aspect-[1/1] w-full sm:aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src="/images/hero.png"
                alt="Kabadi Baba scrap dealer and free scrap pickup service in Gorakhpur"
                fill
                priority
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Image Bottom Trust Strip */}
            <div className="grid grid-cols-3 divide-x divide-green-100 bg-white px-3 py-4 sm:px-5 sm:py-5">
              <div className="text-center">
                <p className="text-lg font-extrabold text-green-700 sm:text-xl">Free</p>
                <p className="text-[11px] font-medium text-gray-500 sm:text-xs">Doorstep Pickup</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-green-700 sm:text-xl">Best</p>
                <p className="text-[11px] font-medium text-gray-500 sm:text-xs">Market Price</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-extrabold text-green-700 sm:text-xl">Instant</p>
                <p className="text-[11px] font-medium text-gray-500 sm:text-xs">UPI Payment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
