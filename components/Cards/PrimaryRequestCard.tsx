import { disasters, IDisaster } from "@/data/disasters";
import Image from "next/image";
import PillButton from "../Buttons/PillButton";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface props {
  createdAt: number;
  place: string;
  cause: string;
  collected: number;
  goal: number;
  validations: number;
}
export default function PrimaryDonationCard({
  createdAt,
  cause,
  collected,
  goal,
  place,
  validations,
}: props) {
  const [progressPercentage] = useState<number>((collected / goal) * 100);
  const [disaster, setDisaster] = useState<{
    label: string;
    emoji: string;
  } | null>(null);

  const getDisasterInfo = (id: string) => {
    const disaster = disasters.find((disaster) => disaster.id === id);
    return disaster ? { label: disaster.label, emoji: disaster.emoji } : null;
  };

  useEffect(() => {
    setDisaster(getDisasterInfo(cause));
  }, [cause]);

  return (
    <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl">
      <div className="flex flex-row gap-2.5 px-5">
        <div className="flex-1 flex flex-nowrap gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[14px]">
              📅 Publicado el {new Date(createdAt).toLocaleDateString("es-ES")}
              <br />
              📍 {place}
              <br />
              {disaster && (
                <>
                  {disaster.emoji} {disaster.label}
                </>
              )}
              <br />
              <span className="font-semibold">
                💸 Monto requerido: ${goal} ARS
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-nowrap gap-3 items-center justify-center">
          <ChevronRight size={42} color="#783BE3"></ChevronRight>
        </div>
      </div>
      <hr className="h-[1px] bg-red-100 my-4" />

      <div className="flex gap-[5%] px-5">
        <div className="relative w-[57.5%] flex flex-col justify-center items-center gap-1.5 text-brand-darkpurple">
          <h3>Recaudado:</h3>
          <div className="w-full">
            <div className="w-full h-4 bg-gray-200 rounded-full mb-2">
              <div
                className="h-full bg-purple-gradient rounded-full"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-gray-500 text-xs">
              <div>{collected} ARS</div>
              <div>{goal} ARS</div>
            </div>
          </div>
        </div>
        <div className="relative w-[37.5%] text-center">
          <h3>Validado por</h3>
          <span className="text-[#6F34D1] font-semibold text-[20px] text-center">
            {validations}
          </span>
        </div>
      </div>
    </div>
  );
}
