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
      className="relative min-h-screen overflow-hidden bg-cover bg-[20%_center]"
      style={{
        backgroundImage: "url('/images/hero.png')",
      }}
    >
      {/* Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-24 md:px-6">
        {/* LEFT CONTENT */}
        <div className="w-full max-w-2xl text-white md:w-1/2 lg:w-[52%]">

          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-green-600/90 px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur sm:px-5 sm:text-sm">
            <ShieldCheck size={18} />
            Gorakhpur's Trusted Scrap Pickup Service
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl md:mt-8 md:text-6xl lg:text-7xl">
            गोरखपुर का
            <br />
            <span className="text-green-400">
              सबसे भरोसेमंद
            </span>
            <br />
            Scrap Pickup
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:text-lg sm:leading-8 md:mt-8 md:text-xl">
            घर बैठे अपना पुराना अखबार, लोहा, प्लास्टिक, ई-वेस्ट और अन्य
            कबाड़ बेचें।
            <br />
            <span className="font-semibold text-white">
              Free Doorstep Pickup • Digital Weighing • Best Market Price •
              Instant UPI Payment
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">

            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-green-700 shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:py-4"
            >
              <Truck size={20} />
              Book Pickup
            </a>

            <a
              href="https://wa.me/917377788810"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#1EBE5D] sm:px-8 sm:py-4"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>

            <a
              href="tel:+917377788810"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-green-700 sm:px-8 sm:py-4"
            >
              <Phone size={20} />
              Call Now
            </a>

          </div>

          {/* Trust Features */}
          <div className="mt-8 flex flex-wrap gap-3 text-sm sm:mt-10 sm:gap-4 sm:text-base">

            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur sm:px-4">
              <Truck className="text-green-400" size={18} />
              Free Pickup
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur sm:px-4">
              <Scale className="text-green-400" size={18} />
              Digital Weighing
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur sm:px-4">
              <IndianRupee className="text-green-400" size={18} />
              Best Market Price
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}