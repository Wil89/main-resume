import { METRICS, ENTERPRISE_CLIENTS } from "@/app/data/constants";

export function Metrics() {
  return (
    <div id="metrics" className="bg-foreground px-8 sm:px-[15%] py-24 sm:py-32">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
        {METRICS.map((m) => (
          <div key={m.id} data-reveal className="text-center sm:text-left">
            <p className="text-5xl md:text-6xl font-bold text-white">
              {m.value}
            </p>
            <p className="text-gray-500 text-lg font-extralight mt-2">
              {m.label}
            </p>
          </div>
        ))}
      </div>
      <div
        data-reveal
        className="mt-16 sm:mt-20 border-t border-gray-600/30 pt-8 text-center sm:text-left"
      >
        <p className="text-gray-600 text-sm font-semibold uppercase tracking-[0.25em] mb-3">
          Shipped for
        </p>
        <p className="text-gray-400 text-lg sm:text-xl font-extralight">
          {ENTERPRISE_CLIENTS.join("  ·  ")}
        </p>
      </div>
    </div>
  );
}
