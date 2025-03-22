"use client";

import PrimaryDonationCard from "@/components/Cards/PrimaryDonationCard";
import Navbar from "@/components/Navigation/Navbar";
import { disasters } from "@/data/disasters";
import Image from "next/image";
import { Fragment, useState } from "react";

export default function Donate() {
  const [selectedFilter, setSelectedFilter] = useState<string>("Urgente");

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };



  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 text-black text-[15px]">
      <Navbar title="Donar" returnTo={"/"}></Navbar>
      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="overflow-x-scroll">
          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Mayor % recaudado"
              isSelected={selectedFilter === "Mayor % recaudado"}
              onClick={() => handleFilterClick("Mayor % recaudado")}
            />
            <FilterPill
              label="Menor % recaudado"
              isSelected={selectedFilter === "Menor % recaudado"}
              onClick={() => handleFilterClick("Menor % recaudado")}
            />
            <FilterPill
              label="Necesidades primarias"
              isSelected={selectedFilter === "Necesidades primarias"}
              onClick={() => handleFilterClick("Necesidades primarias")}
            />
          </div>

          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Necesidades secundarias"
              isSelected={selectedFilter === "Necesidades secundarias"}
              onClick={() => handleFilterClick("Necesidades secundarias")}
            />
            <FilterPill
              label="Mas validados"
              isSelected={selectedFilter === "Mas validados"}
              onClick={() => handleFilterClick("Mas validados")}
            />
            <FilterPill
              label="Menos validados"
              isSelected={selectedFilter === "Menos validados"}
              onClick={() => handleFilterClick("Menos validados")}
            />
          </div>

          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Más reciente"
              isSelected={selectedFilter === "Más reciente"}
              onClick={() => handleFilterClick("Más reciente")}
            />
            <FilterPill
              label="Más antiguo"
              isSelected={selectedFilter === "Más antiguo"}
              onClick={() => handleFilterClick("Más antiguo")}
            />
            <FilterPill
              label="Urgente"
              isSelected={selectedFilter === "Urgente"}
              onClick={() => handleFilterClick("Urgente")}
            />
          </div>
        </div>
      </section>
      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
        <PrimaryDonationCard
          name="Julián Rodríguez"
          createdAt={new Date().getTime()}
          cause={disasters.find(d => d.id == "flood")}
          place="Bahia Blanca"
          image="/placeholder.png"
          collected={0}
          goal={100}
          validations={100}
        ></PrimaryDonationCard>
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
