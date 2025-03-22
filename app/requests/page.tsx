"use client";

import PillButton from "@/components/Buttons/PillButton";
import PrimaryRequestCard from "@/components/Cards/PrimaryRequestCard";
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
      <Navbar title="Tus pedidos de ayuda" returnTo={"/"}></Navbar>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <PrimaryRequestCard
          createdAt={new Date().getTime()}
          cause={disasters.find((d) => d.id == "flood")}
          place="Bahia Blanca"
          collected={0}
          goal={100}
          validations={100}
        ></PrimaryRequestCard>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <PillButton label="Iniciar otro pedido"></PillButton>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <h2 className="w-full text-center">Novedades</h2>
        <Notification
          icon={"💰"}
          label="Recibiste una donación de 100.000$ ARS 🎉"
        ></Notification>
        <Notification
          icon={"💰"}
          label="Recibiste una donación de 100.000$ ARS 🎉"
        ></Notification>
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

interface NotificationProps {
  icon: string;
  label: string;
}

function Notification({ icon, label }: NotificationProps) {
  return (
    <div className="w-full px-5 py-4 border border-gray-300 text-gray-700 rounded-2xl flex gap-[5%] text-[20px]">
      <div className="flex items-center justify-center w-[22.5%]">
        <span className="bg-brand-purple p-2 rounded-full">{icon}</span>
      </div>
      <div className="flex items-center justify-center text-gray-500 text-xs w-[72.5%]">
        <span className="text-[15px]">{label}</span>
      </div>
    </div>
  );
}
