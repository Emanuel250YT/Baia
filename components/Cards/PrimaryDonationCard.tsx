"use client";

import { disasters } from "@/data/disasters";
import useExchangeRate from "@/utils/useExchangeRate";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface props {
  id: string;
  image: string;
  name: string;
  createdAt: number;
  place: string;
  cause: string;
  collected: number;
  goal: number;
  validations: number;
}
export default function PrimaryDonationCard({
  id,
  image,
  name,
  createdAt,
  cause,
  collected,
  goal,
  place,
  validations,
}: props) {
  const { exchangeRate, exchangeRateLoading } = useExchangeRate();
  const convertUsdToArs = (value: any) => {
    if (exchangeRateLoading) return "...";
    if (exchangeRate) return value * exchangeRate;
  };

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

  return progressPercentage !== 100 ? (
    <>
      <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl">
        <div className="flex flex-col gap-2.5 px-5">
          <div className="flex flex-nowrap gap-3">
            <Image
              src={image}
              className="aspect-square object-cover rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#783BE3] via-[#6028B5] to-[#783BE3] max-w-[56px] max-h-[56px]"
              alt="placeholder"
              width={56}
              height={56}
            ></Image>
            <div className="flex flex-col gap-1">
              <h2 className="text-[18px] font-semibold">{name}</h2>
              <p className="text-[14px]">
                📅 Publicado el{" "}
                {new Date(createdAt).toLocaleDateString("es-ES")}
                <br />
                📍 {place}
                <br />
                {disaster && (
                  <>
                    {disaster.emoji} {disaster.label}
                  </>
                )}
              </p>
            </div>
          </div>
          <Link
            href={`/damnificated-profile/${id}`}
            className="bg-purple-gradient text-center rounded-full px-3 py-1.5 text-white"
          >
            Donar
          </Link>
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
                <div>{convertUsdToArs(collected)} ARS</div>
                <div>{convertUsdToArs(goal)} ARS</div>
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
    </>
  ) : null;
}
