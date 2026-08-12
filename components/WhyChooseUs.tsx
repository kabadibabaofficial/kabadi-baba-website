'use client';

import React from 'react';
import { 
  BadgeIndianRupee, 
  Clock, 
  Scale, 
  Zap, 
  ShieldCheck, 
  Leaf 
} from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: BadgeIndianRupee,
      title: 'Best Market Price',
      description: 'Transparent rates updated daily. No hidden deductions.',
    },
    {
      icon: Clock,
      title: 'Same Day Pickup',
      description: 'Book before 2 PM and get pickup the same day in Gorakhpur.',
    },
    {
      icon: Scale,
      title: 'Digital Weighing',
      description: 'Accurate electronic weighing scale. No disputes.',
    },
    {
      icon: Zap,
      title: 'Instant UPI Payment',
      description: 'Money credited to your UPI within 30 minutes of pickup.',
    },
    {
      icon: ShieldCheck,
      title: 'Trusted & Verified',
      description: 'Professional team, proper ID, and fully transparent process.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Your scrap is recycled responsibly. Help the planet.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Why Choose Kabadi Baba?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium experience, complete transparency, and instant payment —
            the way scrap selling should be.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 hover:border-emerald-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-emerald-50 group-hover:bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-emerald-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
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