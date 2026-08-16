"use client";

import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10 text-center sm:mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Contact Us
          </h2>

          <p className="mt-4 text-sm text-gray-600 sm:text-base">
            हमसे संपर्क करें या WhatsApp पर तुरंत Pickup बुक करें।
          </p>
        </div>

        {/* CONTACT DETAILS + MAP */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">

          {/* CONTACT DETAILS */}
          <div className="space-y-6">

            {/* PHONE */}
            <div className="flex gap-4">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-green-600" />

              <div>
                <h3 className="font-bold text-gray-900">
                  Phone
                </h3>

                <a
                  href="tel:+917377788810"
                  className="text-gray-600 transition hover:text-green-600"
                >
                  +91 7377788810
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex gap-4">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-green-600" />

              <div>
                <h3 className="font-bold text-gray-900">
                  Email
                </h3>

                <a
                  href="mailto:info@kabadibaba.com"
                  className="text-gray-600 transition hover:text-green-600"
                >
                  info@kabadibaba.com
                </a>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-green-600" />

              <div>
                <h3 className="font-bold text-gray-900">
                  Address
                </h3>

                <p className="leading-6 text-gray-600">
                  216K, Ram Janki Nagar,
                  <br />
                  Kaushalpuram, Bashratpur,
                  <br />
                  Gorakhpur, Uttar Pradesh
                </p>
              </div>
            </div>

            {/* WORKING HOURS */}
            <div className="flex gap-4">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-green-600" />

              <div>
                <h3 className="font-bold text-gray-900">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  9:00 AM - 7:00 PM
                </p>
              </div>
            </div>

          </div>

          {/* GOOGLE MAP */}
          <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-100">
            <iframe
              src="https://www.google.com/maps?q=26.7904735,83.3698636&output=embed"
              width="100%"
              height="350"
              loading="lazy"
              title="Kabadi Baba Location"
              className="border-0"
            />
          </div>

        </div>
      </div>
    </section>
  );
}