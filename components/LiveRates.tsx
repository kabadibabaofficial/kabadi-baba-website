'use client';

import React from 'react';

const rates = [
  { item: 'Newspaper', rate: '₹18/kg' },
  { item: 'Cardboard', rate: '₹12/kg' },
  { item: 'Plastic', rate: '₹20/kg' },
  { item: 'Iron', rate: '₹35/kg' },
  { item: 'Steel', rate: '₹40/kg' },
  { item: 'Copper', rate: '₹700/kg' },
  { item: 'Brass', rate: '₹520/kg' },
  { item: 'Aluminium', rate: '₹170/kg' },
];

export default function LiveRates() {
  return (
    <section id="rates" className="py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
            Today's Live Rates
          </span>

          <h2 className="text-5xl font-bold mt-5 text-gray-900">
            आज के कबाड़ के रेट
          </h2>

          <p className="text-xl text-gray-600 mt-4">
            प्रतिदिन अपडेट होने वाले मार्केट रेट
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl shadow-xl bg-white">

          <table className="w-full">

            <thead className="bg-emerald-600 text-white">

              <tr>
                <th className="py-5 px-6 text-left">Item</th>
                <th className="py-5 px-6 text-right">Rate</th>
              </tr>

            </thead>

            <tbody>

              {rates.map((rate, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-emerald-50 transition"
                >
                  <td className="px-6 py-5 font-medium">
                    {rate.item}
                  </td>

                  <td className="px-6 py-5 text-right font-bold text-emerald-700">
                    {rate.rate}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </section>
  );
}