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
    <section className="bg-green-700 py-14">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Icon
                    className="text-green-600"
                    size={34}
                  />
                </div>

                <h2 className="mt-6 text-4xl font-extrabold text-green-700">
                  {item.number}
                </h2>

                <p className="mt-2 text-gray-600">
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