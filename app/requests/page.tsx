"use client";

import { ICause } from "@/classes/Cause";
import PillButton from "@/components/Buttons/PillButton";
import PrimaryRequestCard from "@/components/Cards/PrimaryRequestCard";
import Navbar from "@/components/Navigation/Navbar";
import Subtitle from "@/components/Text/Subtitle";
import { disasters } from "@/data/disasters";
import { GetWalletSession } from "@/utils/GetWalletSession";
import { MiniKit } from "@worldcoin/minikit-js";
import { Wallet } from "lucide-react";
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
      <Navbar title="Tus pedidos de ayuda"></Navbar>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        {loading && !wallet ? (
          <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl animate-pulse">
            <div className="flex flex-row gap-2.5 px-5">
              <div className="flex-1 flex flex-nowrap gap-3">
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-40 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-56 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="flex flex-nowrap gap-3 items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              </div>
            </div>

            <hr className="h-[1px] bg-gray-200 my-4" />

            <div className="flex gap-[5%] px-5">
              <div className="relative w-[57.5%] flex flex-col justify-center items-center gap-1.5">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="w-full">
                  <div className="w-full h-4 bg-gray-200 rounded-full mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="relative w-[37.5%] text-center">
                <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-6 w-12 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        ) : !loading && !wallet ? (
          <>
            <button
              onClick={() => {
                fetchWallet();
              }}
              className="w-full bg-gray-900 text-white py-3 rounded-xl relative overflow-hidden flex flex-row flex-nowrap items-center justify-center gap-2 disabled:bg-gray-600"
            >
              Conectar wallet <Wallet />
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
        {wallet && (
          <PillButton
            label="Iniciar otro pedido"
            link={"/recieve-donations"}
          ></PillButton>
        )}
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
