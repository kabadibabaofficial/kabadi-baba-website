'use client';

import React from 'react';
import { Star, MessageCircle, Quote } from 'lucide-react';

const CustomerReviews = () => {
  // Real customer reviews yahan baad mein add kiye jayenge.
  // Fake reviews intentionally nahi rakhe gaye hain.
  const reviews: {
    name: string;
    location: string;
    review: string;
    rating: number;
  }[] = [];

  return (
    <section id="reviews" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <Star className="h-4 w-4 fill-current" />
            Customer Reviews
          </span>

          <h2 className="mb-4 mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            हमारे Customers क्या कहते हैं?
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Kabadi Baba की service लेने वाले customers के असली reviews
            यहाँ दिखाई देंगे।
          </p>
        </div>

        {/* Reviews */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <Quote className="h-7 w-7 text-emerald-100" />
                </div>

                <p className="mb-6 leading-relaxed text-gray-600">
                  “{review.review}”
                </p>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {review.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Reviews Coming Soon */
          <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-100 bg-white p-10 text-center shadow-sm md:p-14">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
              <MessageCircle className="h-8 w-8 text-emerald-600" />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-gray-900">
              Customer Reviews Coming Soon
            </h3>

            <p className="mx-auto max-w-xl leading-relaxed text-gray-600">
              जैसे-जैसे हमारे customers अपने real reviews देंगे,
              उनके reviews यहाँ दिखाए जाएंगे।
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
              <Star className="h-4 w-4 text-yellow-500" />
              Real customer feedback
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;