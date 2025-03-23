"use client";

import PillButton from "@/components/Buttons/PillButton";
import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "./loading";

export default function Home() {
  const { data, status, update } = useSession();

  if(status == "loading") return <Loading />

  return (
    <main className="animate-fade-in bg-white flex min-h-screen flex-col items-center justify-evenly gap-y-3 text-black text-[22px]">
      <section className="relative w-[90%] mx-auto px-6 flex flex-col items-center gap-2 ">
        <div className="flex gap-2 flex-nowrap justify-center items-center">
          <Image src="/logo/icon.png" width={52} height={52} alt="" />
          <Image src="/logo/brand.png" width={140} height={52} alt="" />
        </div>
        <h2 className="font-semibold">Ayuda a damnificados.</h2>
      </section>
      <section className="relative w-[90%] mx-auto px-6 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4">
          <PillButton label="Donar" link="/donate"></PillButton>

          <PillButton label="Mis peticiones" link="/requests"></PillButton>
        </div>

        {status == "unauthenticated" ? (
          <button
            className="text-gray-700 text-[18px] underline"
            onClick={() => signIn("worldcoin")}
          >
            Iniciar sesión
          </button>
        ) : (
          status == "authenticated" && (
            <button
              className="text-gray-700 text-[18px] underline"
              onClick={() => signOut()}
            >
              Cerrar sesión
            </button>
          )
        )}

        {/* <PayBlock></PayBlock> */}
        {/* <VerifyBlock validation="4977ba1c-1d73-4756-82ef-0541ebb3f92d" wallet="0x427cc9d8e489287c221d4c75edd446723ee0e1a0"></VerifyBlock> */}
        {/* <div className="flex flex-col gap-y-4">
          <PillButton label="Iniciar sesión"></PillButton>
        </div> */}
      </section>
    </main>
  );
}
