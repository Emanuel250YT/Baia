import { useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

interface PillButtonInterface {
  label: string;
  submitting?: boolean;
  bgColor?: string;
  textColor?: string;
  link?: string;
  action?: (e: React.FormEvent) => Promise<void> | void;
}

export default function PillButton({
  label,
  submitting = false,
  bgColor,
  textColor,
  link,
  action,
}: PillButtonInterface) {
  const [isSubmitting, setIsSubmitting] = useState(submitting);

  const handleClick = async (e: React.FormEvent) => {
    if (!action) return;
    setIsSubmitting(true);
    try {
      await action(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styleClasses =
    "py-3 rounded-2xl text-center w-full flex-1 text-[20px] font-semibold flex items-center justify-center gap-2 transition duration-100 cursor-pointer disabled:cursor-not-allowed disabled:animate-pulse";

  const buttonStyles = {
    backgroundColor: isSubmitting ? "#8B56E8" : bgColor || "#783BE3", 
    color: textColor || "#FFFFFF",
  };

  const content = (
    <>
      {isSubmitting && <LoaderCircle className="animate-spin" />}
      {label}
    </>
  );

  return action ? (
    <button
      style={buttonStyles}
      onClick={handleClick}
      className={styleClasses}
      disabled={isSubmitting}
    >
      {content}
    </button>
  ) : (
    <Link
      href={link || "/"}
      style={buttonStyles}
      className={styleClasses}
    >
      {content}
    </Link>
  );
}
