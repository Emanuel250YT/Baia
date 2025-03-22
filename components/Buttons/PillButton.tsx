import Link from "next/link";

interface PillButtonInterface {
  label: string;
  bgColor?: string;
  textColor?: string;
  link?: string;
  action?: () => void;
}

export default function PilLButton({
  label,
  bgColor,
  textColor,
  link,
  action,
}: PillButtonInterface) {
  return action ? (
    <button
      style={{
        backgroundColor: bgColor ? bgColor : "#783BE3",
        color: textColor ? textColor : "#FFFFFF",
      }}
      onClick={action}
      className="py-3 rounded-2xl text-center"
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
      className="py-3 rounded-2xl text-center"
    >
      {label}
    </Link>
  );
}
