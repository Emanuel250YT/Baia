"use client";

import { ICause } from "@/classes/Cause";
import PillButton from "@/components/Buttons/PillButton";
import PrimaryRequestCard from "@/components/Cards/PrimaryRequestCard";
import Navbar from "@/components/Navigation/Navbar";
import Subtitle from "@/components/Text/Subtitle";
import { disasters } from "@/data/disasters";
import { GetWalletSession } from "@/utils/GetWalletSession";
import { MiniKit } from "@worldcoin/minikit-js";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function Request() {
  const [wallet, setWallet] = useState<string | null>("");
  const [causes, setCauses] = useState<Array<ICause>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchCauses = async (_wallet: string) => {
    const request = await fetch(`/api/causes/${_wallet}`);
    console.log("wallet", _wallet);
    if (request.status === 200) {
      const data = await request.json();
      console.log(data.body);
      setCauses(data.body);
    }

    return;
  };

  const fetchWallet = async (): Promise<void> => {
    setLoading(true);
    const address = await GetWalletSession();
    if (address) {
      setWallet(address);
      await fetchCauses(address);
    }

    setLoading(false);
  };

  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 text-black text-[15px]">
      <Navbar title="Tus pedidos de ayuda" returnTo={"/"}></Navbar>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        {loading && !wallet ? (
          "loading..."
        ) : !loading && !wallet ? (
          <>
            <span>You need to accept the wallet. Try again</span>
            <button className="underline" onClick={fetchWallet}>
              Try again here
            </button>
          </>
        ) : (
          !loading &&
          wallet &&
          causes.map((cause, index) => (
            <PrimaryRequestCard
              key={index}
              id={cause.uuid}
              createdAt={cause.createdAt}
              cause={cause.cause}
              place={cause.place}
              collected={cause.funds}
              goal={cause.fundsLimit}
              validations={cause.validations}
            ></PrimaryRequestCard>
          ))
        )}
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <PillButton
          label="Iniciar otro pedido"
          link={"/recieve-donations"}
        ></PillButton>
      </section>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <Subtitle content={"🔔 Novedades"} />
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

interface NotificationProps {
  icon: string;
  label: string;
}

function Notification({ icon, label }: NotificationProps) {
  return (
    <div className="w-full px-5 py-4 border border-gray-300 text-gray-700 rounded-2xl flex gap-[5%] text-[20px]">
      <div className="flex items-center justify-center w-[22.5%]">
        <span className="bg-brand-purple aspect-square p-2 rounded-full text-[20px]">
          {icon}
        </span>
      </div>
      <div className="flex items-center justify-center text-gray-500 text-xs w-[72.5%]">
        <span className="text-[15px]">{label}</span>
      </div>
    </div>
  );
}
