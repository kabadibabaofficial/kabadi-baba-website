import Image from "next/image";
import {
  Phone,
  MessageCircle,
  ShieldCheck,
  Truck,
  Scale,
  IndianRupee,
} from "lucide-react";

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
          <h1 className="mt-5 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Gorakhpur&apos;s
            <br />
            <span className="text-green-600">
              Trusted Scrap Dealer
            </span>
            <br />
            &amp; Scrap Pickup Service
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8 md:text-xl">
            Ghar baithe apna purana newspaper, books, cardboard, plastic, iron,
            steel, copper, aluminium, e-waste aur anya kabad bechein.
            <br />
            <span className="font-semibold text-gray-800">
              Free Doorstep Pickup • Digital Weighing • Best Market Price •
              Instant UPI Payment
            </span>
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">

            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-bold text-white shadow-lg shadow-green-600/20 transition duration-300 hover:-translate-y-1 hover:bg-green-700 sm:px-8 sm:py-4"
            >
              <Truck size={20} />
              Book Scrap Pickup
            </a>

            <a
              href="https://wa.me/917377788810"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#1EBE5D] sm:px-8 sm:py-4"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            <a
              href="tel:+917377788810"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-green-600 px-5 py-3 font-bold text-green-700 transition duration-300 hover:-translate-y-1 hover:bg-green-600 hover:text-white sm:px-8 sm:py-4"
            >
              <Phone size={20} />
              Call Now
            </a>

          </div>

          {/* TRUST FEATURES */}
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">

            <div className="flex items-center gap-2 rounded-full border border-green-100 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm sm:px-4 sm:text-base">
              <Truck className="text-green-600" size={18} />
              Free Doorstep Pickup
            </div>

            <div className="flex items-center gap-2 rounded-full border border-green-100 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm sm:px-4 sm:text-base">
              <Scale className="text-green-600" size={18} />
              Digital Weighing
            </div>

            <div className="flex items-center gap-2 rounded-full border border-green-100 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm sm:px-4 sm:text-base">
              <IndianRupee className="text-green-600" size={18} />
              Best Market Price
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE CARD */}
        <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">

          <div className="absolute -inset-3 rounded-[2rem] bg-green-200/50 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-green-100">

            <div className="relative aspect-[1/1] w-full sm:aspect-[16/10] lg:aspect-[4/3]">

              <Image
                src="/images/hero.png"
                alt="Kabadi Baba scrap dealer and doorstep scrap pickup service in Gorakhpur"
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
                <p className="text-lg font-extrabold text-green-700 sm:text-xl">
                  Free
                </p>
                <p className="text-[11px] font-medium text-gray-500 sm:text-xs">
                  Doorstep Pickup
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg font-extrabold text-green-700 sm:text-xl">
                  Best
                </p>
                <p className="text-[11px] font-medium text-gray-500 sm:text-xs">
                  Market Price
                </p>
              </div>

              <div className="text-center">
                <p className="text-lg font-extrabold text-green-700 sm:text-xl">
                  Instant
                </p>
                <p className="text-[11px] font-medium text-gray-500 sm:text-xs">
                  UPI Payment
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}