export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-gray-600 mb-10 sm:mb-14">
      {children}
    </h2>
  );
}
