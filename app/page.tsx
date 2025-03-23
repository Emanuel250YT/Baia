"use client";

import PillButton from "@/components/Buttons/PillButton";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Loading from "./loading";
import TeamMembersList from "@/components/Misc/TeamMemberList";

export default function Home() {
  const { status } = useSession();

  if (status == "loading") return <Loading />;

  return (
    <main className="animate-fade-in bg-white flex min-h-screen flex-col items-center justify-evenly gap-y-3 text-black text-[22px]">
      <section className="relative w-[90%] mx-auto px-6 flex flex-col items-center gap-2 ">
        <div className="flex gap-2 flex-nowrap justify-center items-center animate-pop-in">
          <Image
            src="/logo/icon.png"
            width={52}
            height={52}
            alt=""
            priority={true}
          />
          <Image
            src="/logo/brand.png"
            width={140}
            height={52}
            alt=""
            priority={true}
          />
        </div>
        <h2 className="font-semibold animate-pop-in">Ayuda a damnificados.</h2>
      </section>
      <section className="relative w-[90%] mx-auto px-6 flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4 animate-pop-in">
          <PillButton label="Donar" link="/donate"></PillButton>

          <PillButton label="Mis peticiones" link="/requests"></PillButton>
        </div>

        {status == "unauthenticated" ? (
          <button
            className="text-gray-700 text-[18px] underline animate-pop-in"
            onClick={() => signIn("worldcoin")}
          >
            Iniciar sesión
          </button>
        ) : (
          status == "authenticated" && (
            <button
              className="text-gray-700 text-[18px] underline animate-pop-in"
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

      <section className="relative w-[90%] mx-auto px-6 flex flex-col gap-y-6">
        <TeamMembersList
          team={[
            {
              name: "Emanuel Guzmán",
              image: "/devs/emanuel.png",
              role: "Back-end Developer",
            },
            {
              name: "Arturo Grande",
              role: "Product Manager / Designer",
              image: "/devs/arturo.png",
            },
            {
              name: "Lautaro Spiazzi",
              role: "Front-end Developer",
              image: "/devs/lautaro.png",
            },
          ]}
          tooltipEnabled={true}
        />
      </section>
    </main>
  );
}
