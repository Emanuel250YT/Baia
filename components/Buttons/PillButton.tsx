import Link from "next/link";

interface PillButtonInterface {
  label: string;
  bgColor?: string;
  textColor?: string;
  link?: string;
  action?: (e: React.FormEvent) => void;
}

export default function PilLButton({
  label,
  bgColor,
  textColor,
  link,
  action,
}: PillButtonInterface) {
  const styleClasses = "py-3 rounded-2xl text-center w-full flex-1 text-[20px] font-semibold"
  return action ? (
    <button
      style={{
        backgroundColor: bgColor ? bgColor : "#783BE3",
        color: textColor ? textColor : "#FFFFFF",
      }}
      onClick={action}
      className={styleClasses}
    >
      {label}
    </button>
  ) : (
    <Link
      href={link || "/"}
      style={{
        backgroundColor: bgColor ? bgColor : "#783BE3",
        color: textColor ? textColor : "#FFFFFF",
      }}
      className={styleClasses}
    >
      {label}
    </Link>
  );
}
