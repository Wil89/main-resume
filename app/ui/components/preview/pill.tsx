import Image from "next/image";

interface PillProps {
  leadIcon: string;
  text: string;
  action: () => void;
  active?: boolean;
}

export function Pill({ leadIcon, text, action, active = false }: PillProps) {
  return (
    <button
      type="button"
      onClick={action}
      aria-pressed={active}
      className={`flex items-center justify-start gap-2 py-2 px-4 border-1 rounded-full cursor-pointer transition-colors duration-300 ${
        active
          ? "border-gray-300 bg-white/10"
          : "border-gray-600 hover:border-gray-400"
      }`}
    >
      {/* h-auto: the icon set mixes aspect ratios — let height follow width */}
      <Image width={18} height={18} src={leadIcon} alt="" className="h-auto" />
      <span className={active ? "text-gray-300" : "text-gray-400"}>{text}</span>
    </button>
  );
}
