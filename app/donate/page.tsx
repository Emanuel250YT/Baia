"use client";

import Navbar from "@/components/Navigation/Navbar";
import Image from "next/image";
import { Fragment, useState } from "react";

export default function Donar() {
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
        <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl">
          <div className="flex flex-col gap-2.5 px-5">
            <div className="flex flex-nowrap gap-3">
              <Image
                src={"/placeholder.png"}
                className="rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#783BE3] via-[#6028B5] to-[#783BE3] max-w-[56px] max-h-[56px]"
                alt="placeholder"
                width={56}
                height={56}
              ></Image>
              <div className="flex flex-col gap-1">
                <h2 className="text-[18px] font-semibold">Julián Rodríguez</h2>
                <p className="text-[14px]">
                  📅 Publicado el 3/19/25
                  <br />
                  📍 Bahia Blanca
                  <br />
                  💧 Inundación
                </p>
              </div>
            </div>
            <button className="bg-purple-gradient rounded-full px-3 py-1.5 text-white">
              Donar
            </button>
          </div>
          <hr className="h-[1px] bg-red-100 my-4" />

          <div className="flex gap-[5%] px-5">
            <div className="relative w-[57.5%] flex flex-col justify-center items-center gap-1.5 text-brand-darkpurple">
              <h3>Recaudado:</h3>
              <div className="w-full">
                <div className="w-full h-4 bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-full bg-purple-gradient rounded-full"
                    style={{ width: `50%` }}
                  />
                </div>
                <div className="flex justify-between text-gray-500 text-xs">
                  <div>0 ARS</div>
                  <div>1M ARS</div>
                </div>
              </div>
            </div>
            <div className="relative w-[37.5%] text-center">
              <h3>Validado por</h3>
              <span className="text-[#6F34D1] font-semibold text-[20px] text-center">105</span>
            </div>
          </div>
        </div>
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
