'use client';

import React from 'react';
import {
  BadgeIndianRupee,
  Clock,
  Scale,
  Zap,
  ShieldCheck,
  Leaf,
} from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: BadgeIndianRupee,
      title: 'Best Market Price',
      description:
        'Transparent scrap rates with clear weighing and no hidden deductions.',
    },
    {
      icon: Clock,
      title: 'Doorstep Pickup in Gorakhpur',
      description:
        'Book your scrap pickup from home and get convenient doorstep service in Gorakhpur.',
    },
    {
      icon: Scale,
      title: 'Digital Weighing',
      description:
        'Accurate electronic weighing so you can see the weight clearly and avoid disputes.',
    },
    {
      icon: Zap,
      title: 'Fast Payment',
      description:
        'Get your scrap payment quickly after weighing and finalizing the material.',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted & Transparent',
      description:
        'Professional service with clear weighing, pricing and a straightforward pickup process.',
    },
    {
      icon: Leaf,
      title: 'Responsible Recycling',
      description:
        'We help keep recyclable materials out of landfills by sending suitable scrap for recycling.',
    },
  ];

  return (
    <section id="why-us" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Why Choose Kabadi Baba
          </span>

          <h2 className="mb-4 mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Gorakhpur Mein Kabadi Baba Par Bharosa Kyun Karein?
          </h2>

          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Fair pricing, transparent weighing, convenient doorstep scrap
            pickup and a simple way to sell your recyclable materials.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 transition-colors duration-300 group-hover:bg-emerald-100">
                <feature.icon className="h-8 w-8 text-emerald-600" />
              </div>

              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;