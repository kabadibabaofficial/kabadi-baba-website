import {
  Users,
  Recycle,
  Truck,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "10,000+",
    title: "Happy Customers",
  },
  {
    icon: Recycle,
    number: "500+ Ton",
    title: "Scrap Recycled",
  },
  {
    icon: Truck,
    number: "Same Day",
    title: "Pickup Available",
  },
  {
    icon: ShieldCheck,
    number: "100%",
    title: "Transparent Service",
  },
];

export default function Stats() {
  return (
    <section className="bg-green-700 py-9 sm:py-10 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid gap-3 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-xl bg-white p-5 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl sm:rounded-2xl sm:p-6 lg:p-8"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                  <Icon
                    className="text-green-600"
                    size={26}
                  />
                </div>

                <h2 className="mt-4 text-2xl font-extrabold text-green-700 sm:text-3xl lg:mt-6 lg:text-4xl">
                  {item.number}
                </h2>

                <p className="mt-1 text-xs text-gray-600 sm:mt-2 sm:text-sm">
                  {item.title}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}