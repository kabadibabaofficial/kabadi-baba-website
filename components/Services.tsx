'use client';

import React from 'react';
import Link from 'next/link';
import {
  Newspaper,
  BookOpen,
  Package,
  Trash2,
  Hammer,
  Zap,
  Battery,
  Monitor,
  Laptop,
  Smartphone,
  Tv,
  Refrigerator,
  WashingMachine,
  Bed,
  Recycle
} from 'lucide-react';

const categories = [
  { icon: Newspaper, title: "Newspaper", desc: "पुराने अखबार और मैगजीन" },
  { icon: BookOpen, title: "Books", desc: "किताबें और नोट्स" },
  { icon: Package, title: "Cardboard", desc: "कार्डबोर्ड बॉक्स" },
  { icon: Trash2, title: "Plastic", desc: "सभी प्रकार का प्लास्टिक" },
  { icon: Hammer, title: "Iron", desc: "लोहा और स्टील" },
  { icon: Hammer, title: "Steel", desc: "स्टील का सामान" },
  { icon: Zap, title: "Copper", desc: "तांबा और वायर" },
  { icon: Zap, title: "Brass", desc: "पीतल का सामान" },
  { icon: Zap, title: "Aluminium", desc: "एल्यूमिनियम" },
  { icon: Battery, title: "Battery", desc: "कार / इन्वर्टर बैटरी" },
  { icon: Monitor, title: "Computer", desc: "पुराना कंप्यूटर" },
  { icon: Laptop, title: "Laptop", desc: "लैपटॉप" },
  { icon: Smartphone, title: "Mobile", desc: "मोबाइल फोन" },
  { icon: Tv, title: "TV", desc: "टीवी और LED" },
  { icon: Refrigerator, title: "Fridge", desc: "फ्रिज" },
  { icon: Refrigerator, title: "AC", desc: "एयर कंडीशनर" },
  { icon: WashingMachine, title: "Washing Machine", desc: "वॉशिंग मशीन" },
  { icon: Bed, title: "Furniture", desc: "पुराना फर्नीचर" },
  { icon: Recycle, title: "E-Waste", desc: "इलेक्ट्रॉनिक वेस्ट" },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-5xl font-bold text-gray-900">
            हम क्या खरीदते हैं
          </h2>

          <p className="mt-4 text-xl text-gray-600">
            घर बैठे अपना कबाड़ बेचें और तुरंत भुगतान पाएं
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {categories.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow hover:shadow-xl transition p-6 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-100 mx-auto flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-green-600" />
                </div>

                <h3 className="font-bold text-lg">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {item.desc}
                </p>
              </div>
            );
          })}

        </div>

        <div className="text-center mt-14">
          <Link
            href="#book"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-semibold transition"
          >
            🚚 Book Free Pickup
          </Link>
        </div>

      </div>
    </section>
  );
}