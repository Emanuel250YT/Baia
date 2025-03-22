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

      const isValidPriority =
        selectedFilter && selectedFilter in PrioritiesKeys;

      const filter = isValidPriority
        ? { priority: selectedFilter as keyof typeof PrioritiesKeys }
        : undefined;

      const request = await fetch(
        `/api/causes?page=1&limit=1&${filter ? `priority=${filter}` : ""}`
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
      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-3">
        {loading ? (
          <p className="text-center text-gray-500">Cargando causas...</p>
        ) : causes && causes.length > 0 ? (
          causes.map((cause) => (
            <PrimaryDonationCard
              key={cause.uuid}
              id={cause.uuid}
              name={cause.owner}
              createdAt={cause.createdAt}
              // cause={cause.detail}
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
