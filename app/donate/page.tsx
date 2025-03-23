"use client";

import PrimaryDonationCard from "@/components/Cards/PrimaryDonationCard";
import Navbar from "@/components/Navigation/Navbar";
import { disasters } from "@/data/disasters";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

import { GetAllCauses } from "@/requests/causes/methods";
import { ICause } from "@/classes/Cause";
import { PrioritiesKeys } from "@/data/causePriority";

export default function Donate() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [causes, setCauses] = useState<Array<ICause> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCauses() {
      setLoading(true);

      const request = await fetch(
        `/api/causes?page=1&limit=1${selectedFilter ? `&priority=${selectedFilter}` : ""}`
      );
      if (request.status === 200) {
        const data = await request.json();
        setCauses(data.body);
      }
      setLoading(false);
    }

    fetchCauses();
  }, [selectedFilter]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <main className="animate-fade-in bg-white flex min-h-screen flex-col gap-y-5 text-black text-[15px]">
      <Navbar title="Donar"></Navbar>
      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="overflow-x-scroll">
          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Mayor % recaudado"
              isSelected={selectedFilter === "Mayor % recaudado"}
              onClick={() => handleFilterClick(PrioritiesKeys.MajorGoal)}
            />
            <FilterPill
              label="Menor % recaudado"
              isSelected={selectedFilter === "Menor % recaudado"}
              onClick={() => handleFilterClick(PrioritiesKeys.MinorGoal)}
            />
            <FilterPill
              label="Necesidades primarias"
              isSelected={selectedFilter === "Necesidades primarias"}
              onClick={() => handleFilterClick(PrioritiesKeys.Primary)}
            />
          </div>

          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Necesidades secundarias"
              isSelected={selectedFilter === "Necesidades secundarias"}
              onClick={() => handleFilterClick(PrioritiesKeys.Secondary)}
            />
            <FilterPill
              label="Mas validados"
              isSelected={selectedFilter === "Mas validados"}
              onClick={() => handleFilterClick(PrioritiesKeys.MostValidated)}
            />
            <FilterPill
              label="Menos validados"
              isSelected={selectedFilter === "Menos validados"}
              onClick={() => handleFilterClick(PrioritiesKeys.PoorValidated)}
            />
          </div>

          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Más reciente"
              isSelected={selectedFilter === "Más reciente"}
              onClick={() => handleFilterClick(PrioritiesKeys.Recent)}
            />
            <FilterPill
              label="Más antiguo"
              isSelected={selectedFilter === "Más antiguo"}
              onClick={() => handleFilterClick(PrioritiesKeys.Oldest)}
            />
            <FilterPill
              label="Urgente"
              isSelected={selectedFilter === "Urgente"}
              onClick={() => handleFilterClick(PrioritiesKeys.Important)}
            />
          </div>
        </div>
      </section>
      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-3">
        {loading ? (
          <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl">
            <div className="flex flex-col gap-2.5 px-5">
              <div className="flex flex-nowrap gap-3">
                <div className="aspect-square rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#783BE3]/30 via-[#6028B5]/30 to-[#783BE3]/30 w-[56px] h-[56px] animate-pulse" />

                <div className="flex flex-col gap-1">
                  <div className="h-[18px] w-32 bg-gray-200 rounded animate-pulse" />

                  <div className="space-y-1 mt-1">
                    <div className="h-[14px] w-36 bg-gray-200 rounded animate-pulse" />
                    <div className="h-[14px] w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-[14px] w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="h-9 bg-gray-200 rounded-full animate-pulse" />
            </div>

            <hr className="h-[1px] bg-red-100 my-4" />

            <div className="flex gap-[5%] px-5">
              <div className="relative w-[57.5%] flex flex-col justify-center items-center gap-1.5">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse self-start" />

                <div className="w-full">
                  <div className="w-full h-4 bg-gray-200 rounded-full mb-2 animate-pulse" />

                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="relative w-[37.5%] text-center">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mx-auto" />

                <div className="h-[20px] w-12 bg-gray-200 rounded animate-pulse mx-auto mt-1" />
              </div>
            </div>
          </div>
        ) : causes && causes.length > 0 ? (
          causes.map((cause) => (
            <PrimaryDonationCard
              key={cause.uuid}
              id={cause.uuid}
              name={cause.owner}
              createdAt={cause.createdAt}
              cause={cause.cause}
              place={cause.place}
              image={cause.profile || "/placeholder.png"}
              collected={cause.funds}
              goal={cause.fundsLimit}
              validations={cause.validations}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No hay causas disponibles</p>
        )}
      </section>
    </main>
  );
}

interface FilterPillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function FilterPill({ label, isSelected, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border whitespace-nowrap border-gray-300 text-gray-700`}
    >
      {label}
    </button>
  );
}
