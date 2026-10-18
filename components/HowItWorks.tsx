import {
  CalendarCheck,
  Truck,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Pickup Book करें",
    description:
      "अपना नाम, मोबाइल और कबाड़ की जानकारी देकर pickup बुक करें।",
  },
  {
    icon: Truck,
    title: "घर से कबाड़ उठाएँगे",
    description:
      "हमारी टीम आपके घर से कबाड़ उठाएगी और डिजिटल वजन करेगी।",
  },
  {
    icon: IndianRupee,
    title: "तुरंत Payment पाएँ",
    description:
      "सही वजन के अनुसार कीमत तय होगी और आपको तुरंत UPI या Cash Payment मिलेगा।",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-6 sm:py-16">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="mb-6 text-center sm:mb-12">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            आसान और भरोसेमंद तरीका
          </h2>

          <p className="mt-2 text-base font-semibold text-gray-800 sm:mt-3 sm:text-2xl">
            कबाड़ बेचें आसान तरीके से — सिर्फ 3 स्टेप में
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-sm font-medium leading-5 text-gray-700 sm:mt-3 sm:text-base sm:leading-7">
            Kabadi Baba के साथ घर बैठे कबाड़ बेचें और तुरंत Payment पाएँ।
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className={
                  "relative flex flex-col items-center text-center " +
                  (index === 2
                    ? "col-span-2 mx-auto w-1/2 md:col-span-1 md:w-full"
                    : "")
                }
              >
                <div className="relative mb-2 flex h-20 w-20 items-center justify-center sm:mb-5 sm:h-32 sm:w-32">
                  <div className="absolute inset-2 rounded-full bg-green-100 sm:inset-3" />

                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white shadow-md sm:h-16 sm:w-16">
                    <Icon
                      size={22}
                      strokeWidth={2}
                      className="sm:hidden"
                    />
                    <Icon
                      size={29}
                      strokeWidth={2}
                      className="hidden sm:block"
                    />
                  </div>
                </div>

                <h3 className="text-base font-bold leading-5 text-gray-900 sm:text-xl sm:leading-7">
                  {step.title}
                </h3>

                <p className="mt-1 max-w-xs text-sm font-medium leading-5 text-gray-700 sm:mt-2 sm:text-base sm:leading-6">
                  {step.description}
                </p>

                {index < 2 && (
                  <div className="mt-2 text-green-600 md:hidden">
                    <ArrowRight
                      size={16}
                      className="rotate-90"
                      strokeWidth={2}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs font-semibold text-gray-700 sm:mt-10 sm:gap-4 sm:text-sm">
          <span>♻️ घर से Pickup</span>
          <span className="text-gray-400">•</span>
          <span>⚖️ Digital Weight</span>
          <span className="text-gray-400">•</span>
          <span>💳 UPI / Cash Payment</span>
        </div>
      </div>
    </section>
  );
}