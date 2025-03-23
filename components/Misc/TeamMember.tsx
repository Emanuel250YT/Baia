import React, { useState } from "react";
import Image from "next/image";

interface TeamMemberProps {
  name: string;
  size?: number;
  image?: string;
  tooltipEnabled?: boolean;
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  size = 2.4,
  image,
  tooltipEnabled = true,
}) => {
  const [hasError, setHasError] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n?.charAt(0) ?? "")
    .join("");

  const handleError = () => setHasError(true);

  return (
    <div
      className="rounded-full text-white flex items-center justify-center text-xs font-medium border-2 border-white group relative"
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
      }}
      title={tooltipEnabled ? name : ""}
      role="img"
      aria-label={name}
    >
      {hasError || !image ? (
        <span>{initials}</span>
      ) : (
        <Image
          src={image}
          alt={name}
          width={Math.round(size * 16)}
          height={Math.round(size * 16)}
          className="aspect-square object-cover rounded-full border border-[2px] border-[#783BE3]"
          onError={handleError}
        />
      )}
    </div>
  );
};

export default TeamMember;
