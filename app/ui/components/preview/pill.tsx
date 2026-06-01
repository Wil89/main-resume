import Image from "next/image";

interface PillProps {
  leadIcon: string;
  text: string;
  action: () => void;
}

export function Pill({ leadIcon, text, action }: PillProps) {
  return (
    <button
      onClick={action}
      className="flex items-center justify-start gap-2 py-2 px-4 border-1 border-gray-400 rounded-full cursor-pointer"
    >
      <Image width={18} height={18} src={leadIcon} alt={`${text} icon`} />
      <span className="text-gray-400">{text}</span>
    </button>
  );
}
