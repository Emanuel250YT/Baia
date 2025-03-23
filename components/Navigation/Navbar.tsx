"use client";

import { ArrowLeft, Router } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarInterface {
  title: string;
}

export default function Navbar({ title }: NavbarInterface) {
  const router = useRouter();

  return (
    <nav className="bg-brand-purple relative h-[78px] flex flex-nowrap items-center justify-center">
      <button onClick={() => router.back()} className="text-white absolute left-[23px]">
        <ArrowLeft
          width={32}
          strokeWidth={3}
        />
      </button>

      <h1 className="text-white font-semibold whitespace-nowrap text-[18px] max-w-[calc(100vw-120px)] truncate">
        {title}
      </h1>
    </nav>
  );
}
