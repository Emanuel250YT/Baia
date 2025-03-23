"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-center gap-y-3 text-black text-[22px]">
      <div className="relative w-[90%] mx-auto px-6 flex flex-col items-center gap-y-6">
        <Image
          src="/logo.svg"
          width={72}
          height={72}
          alt=""
          className="animate-pulse"
        />
      </div>
    </main>
  );
}
