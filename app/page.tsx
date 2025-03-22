"use client"

import PillButton from "@/components/Buttons/PillButton";
import { PayBlock } from "@/components/Pay";
import { SignIn } from "@/components/SignIn";
import { VerifyBlock } from "@/components/Verify";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-evenly gap-y-3 text-black text-[22px]">
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

        <button className="text-gray-700 text-[18px] underline">
          Cerrar sesión
        </button>

        {/* <div className="flex flex-col gap-y-4">
          <PillButton label="Iniciar sesión"></PillButton>
        </div> */}
      </section>
    </main>
  );
}
