"use client";

import PillButton from "@/components/Buttons/PillButton";
import Image from "next/image";

export default function SuccessDonation() {
  return (
    <main className="animate-fade-in bg-brand-purple flex min-h-screen flex-col items-center justify-evenly gap-y-3 text-black text-[22px]">
      <section className="relative w-[90%] mx-auto px-6 flex flex-col items-center gap-9">
        <div className="flex flex-col gap-3 flex-nowrap justify-center items-center">
          <Image src="/logo/light/icon.png" width={48} height={48} alt="" />
          <Image src="/logo/light/brand.png" width={120} height={52} alt="" />
        </div>
        <Image src="/success.png" width={72} height={72} alt="" />

        <div className="flex flex-col gap-4 text-white text-[16px] text-center">
          <p>
            ✅ Solicitud enviada con éxito. Nuestro algoritmo analizará tu caso y
            estimará el costo para reponer tus pérdidas. Pronto tu solicitud
            estará disponible para recibir apoyo de la comunidad.
          </p>
          <p>¡Gracias por compartir tu historia, no estás solo! 🖤</p>
        </div>
      </section>
      <section className="relative w-[90%] mx-auto px-6 flex flex-col gap-y-6">
        <PillButton
          label="Continuar"
          link="/"
          bgColor="#000000"
          textColor="#FFFFFF"
        ></PillButton>
      </section>
    </main>
  );
}
