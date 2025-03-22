"use client";

import PillButton from "@/components/Buttons/PillButton";
import PrimaryRequestCard from "@/components/Cards/PrimaryRequestCard";
import Navbar from "@/components/Navigation/Navbar";
import Subtitle from "@/components/Text/Subtitle";
import { disasters } from "@/data/disasters";
import { MiniKit } from "@worldcoin/minikit-js";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

export default function Request() {
  const [wallet, setWallet] = useState<string | null>(null);
  const [causes, setCauses] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async (): Promise<void> => {
    setLoading(true);
    const address = await GetWalletSession();
    if (address) {
      setWallet(address);
    }

    const request = await fetch(`/api/causes${wallet}`);
    if (request.status === 200) {
      const data = await request.json();
      setCauses(data.body);
    }
    setLoading(false);
  };

  const GetWalletSession = async (): Promise<string | null> => {
    if (!MiniKit.isInstalled()) {
      console.warn("MiniKit no está instalado.");
      return null;
    }

    try {
      const res = await fetch(`/api/nonce`);
      const { nonce } = await res.json();
      
      const { commandPayload: generateMessageResult, finalPayload } =
        await MiniKit.commandsAsync.walletAuth({
          nonce,
          requestId: "0",
          expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
          notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          statement: "This is my statement and here is a link https://worldcoin.com/apps",
        });

      if (finalPayload.status === "error") {
        console.error("Error en la autenticación de la wallet.");
        return null;
      }

      const response = await fetch("/api/complete-siwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: finalPayload, nonce }),
      });

      if (!response.ok) {
        console.error("Fallo al completar la autenticación en el servidor.");
        return null;
      }

      return finalPayload.address || null;
    } catch (error) {
      console.error("Error al obtener la dirección de la wallet:", error);
      return null;
    }
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
          wallet && (
            <PrimaryRequestCard
              createdAt={new Date().getTime()}
              cause={"flood"}
              place="Bahia Blanca"
              collected={0}
              goal={100}
              validations={100}
            ></PrimaryRequestCard>
          )
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
