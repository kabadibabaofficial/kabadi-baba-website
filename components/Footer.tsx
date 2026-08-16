export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-900 py-10 text-white">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">

        {/* BRAND */}
        <h2 className="text-2xl font-bold text-green-400">
          Kabadi Baba
        </h2>

        <p className="mt-3 text-sm text-gray-300 sm:text-base">
          Gorakhpur&apos;s Trusted Scrap Pickup Service
        </p>

        {/* CONTACT */}
        <div className="mt-5 space-y-2 text-sm text-gray-300">

          <p>
            📞{" "}
            <a
              href="tel:+917377788810"
              className="transition hover:text-green-400"
            >
              +91 7377788810
            </a>
          </p>

          <p>
            ✉️{" "}
            <a
              href="mailto:info@kabadibaba.com"
              className="transition hover:text-green-400"
            >
              info@kabadibaba.com
            </a>
          </p>

          <p className="mx-auto max-w-md leading-6">
            📍 216K, Ram Janki Nagar,
            <br />
            Kaushalpuram, Bashratpur,
            <br />
            Gorakhpur, Uttar Pradesh
          </p>

        </div>

        {/* COPYRIGHT */}
        <div className="mt-7 border-t border-gray-700 pt-5">
          <p className="text-xs text-gray-400 sm:text-sm">
            © 2026 Kabadi Baba. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}