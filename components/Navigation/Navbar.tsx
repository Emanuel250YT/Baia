import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface NavbarInterface {
  title: string;
  returnTo: string;
}

export default function Navbar({ title, returnTo }: NavbarInterface) {
  return (
    <nav className="bg-brand-purple relative h-[78px] flex flex-nowrap items-center justify-center">
      <Link href={returnTo} className="text-white absolute left-[23px]">
        <ArrowLeft
          width={32}
          strokeWidth={3}
        />
      </Link>

      <h1 className="text-white font-semibold whitespace-nowrap text-[18px] max-w-[calc(100vw-120px)] truncate">
        {title}
      </h1>
    </nav>
  );
}
