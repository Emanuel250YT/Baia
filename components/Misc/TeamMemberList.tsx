import React from "react";
import TeamMember from "./TeamMember";

interface TeamMembersListProps {
  team: { name: string; image?: string, role: string}[];
  tooltipEnabled?: boolean;
}

const TeamMembersList: React.FC<TeamMembersListProps> = ({
  team = [],
  tooltipEnabled = true,
}) => {
  const maxVisibleMembers = 3;
  const displayedMembers = team.slice(0, maxVisibleMembers);

  return (
    <div className="flex flex-col text-sm text-gray-600 gap-1 justify-center items-center">
      Our team
      <div className="flex -space-x-2">
        {displayedMembers.map((member, index) => (
          <TeamMember
            key={`${member.name}-${index}`}
            size={3}
            name={member.name}
            image={member.image}
            tooltipEnabled={tooltipEnabled}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamMembersList;
