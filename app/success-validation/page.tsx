"use client";

import PillButton from "@/components/Buttons/PillButton";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti"

export default function Home() {
  const { width, height } = useWindowSize();
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRunning(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="animate-fade-in bg-brand-purple flex min-h-screen flex-col items-center justify-evenly gap-y-3 text-black text-[22px]">
      <Confetti
        width={width}
        height={height}
        tweenDuration={3000}
        numberOfPieces={isRunning ? 200 : 0}
      />
      <section className="relative w-[90%] mx-auto px-6 flex flex-col items-center gap-9">
        <div className="flex flex-col gap-3 flex-nowrap justify-center items-center">
          <Image src="/logo/light/icon.png" width={48} height={48} alt="" />
          <Image src="/logo/light/brand.png" width={120} height={52} alt="" />
        </div>
        <Image src="/success.png" width={72} height={72} alt="" />

        <div className="flex flex-col gap-4 text-white text-[18px]">
          <p>🎉 ¡Felicidades! Validaste correctamente el pedido.</p>

          <p>🙌 Gracias por ser parte de esta red de ayuda y apoyo.</p>
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
