"use client";

import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <>
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900">
              Contact Us
            </h2>

            <p className="text-gray-600 mt-4">
              हमसे संपर्क करें या WhatsApp पर तुरंत Pickup बुक करें।
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="space-y-6">

              <div className="flex gap-4">
                <Phone className="text-green-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-bold">Phone</h3>
                  <p>+91 7377788810</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="text-green-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p>info@kabadibaba.in</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-green-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-bold">Address</h3>
                  <p>Gorakhpur, Uttar Pradesh</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="text-green-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-bold">Working Hours</h3>
                  <p>9:00 AM - 7:00 PM</p>
                </div>
              </div>

            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg">

              <iframe
                src="https://www.google.com/maps?q=Gorakhpur&output=embed"
                width="100%"
                height="350"
                loading="lazy"
              />

            </div>

          </div>

        </div>
      </section>

      <footer className="bg-green-600 text-white py-6">

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

          <h3 className="font-bold text-xl">
            Kabadi Baba
          </h3>

          <p>
            © 2026 Kabadi Baba. All Rights Reserved.
          </p>

        </div>

      </footer>
    </>
  );
}