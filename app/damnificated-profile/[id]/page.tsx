"use client";

import { ICause } from "@/classes/Cause";
import PillButton from "@/components/Buttons/PillButton";
import ImageCarousel from "@/components/Carousels/Carousel";
import Navbar from "@/components/Navigation/Navbar";
import Subtitle from "@/components/Text/Subtitle";
import Image from "next/image";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DamnificatedProfile() {
  const { id } = useParams();

  const [cause, setCause] = useState<ICause | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      return redirect("/");
    }

    async function fetchCauses() {
      setLoading(true);

      const request = await fetch(`/api/causes/cause/${id}`);
      if (request.status === 200) {
        const data = await request.json();
        console.log(data);
        setCause(data.body);
      }
      setLoading(false);
    }

    fetchCauses();
  }, [id]);

  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 pb-4 text-black text-[15px]">
      <Navbar title="Pedido #x" returnTo={"/donate"}></Navbar>
      {loading
        ? "Loading..."
        : cause && (
            <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="flex flex-nowrap gap-3">
                <Image
                  src={"/placeholder.png"}
                  className="rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#783BE3] via-[#6028B5] to-[#783BE3] max-w-[96px] max-h-[96px]"
                  alt="placeholder"
                  width={96}
                  height={96}
                ></Image>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[18px] font-semibold">{cause.owner}</h2>
                  <p className="text-[14px]">
                    👁️ Verificado con World ID
                    <br />
                    📅 Publicado el{" "}
                    {new Date(cause.createdAt).toLocaleDateString("es-ES")}
                    <br />
                    📍 {cause.place}
                    <br />
                    {cause.cause}
                  </p>
                </div>
              </div>
            </section>
          )}
      <hr className="h-[1px] bg-gray-300" />
      {loading
        ? "Loading..."
        : cause && (
            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"📝 Descripción personal"} />
                <div className="flex-1 w-full p-5 border border-gray-300 text-gray-700 rounded-2xl">
                  <p className="text-[14px]">{cause.description}</p>
                </div>
              </div>
            </section>
          )}
      {loading
        ? "Loading..."
        : cause && (
            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"📸 Fotos de pérdidas materiales"} />

                <div className="w-full p-5 border border-gray-300 text-gray-700 rounded-2xl">
                  <ImageCarousel images={cause.images} />
                </div>
              </div>
            </section>
          )}
      {loading
        ? "Loading..."
        : cause && (
            <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="flex flex-col items-center justify-center gap-3">
                <Subtitle content={"🤖 Pérdida estimada"} />
                <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl">
                  <div className="space-y-4 px-5">
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="h-3 w-3 rounded-full bg-red-500"></span>
                        <h2 className="text-purple-600 font-medium text-sm">
                          Objetos de primera necesidad
                        </h2>
                      </div>

                      <div className="space-y-1.5">
                        <ItemRow
                          icon="👕"
                          name="Ropa"
                          forPeople={4}
                          amount={300000}
                        />
                        <ItemRow icon="❄️" name="Heladera" amount={600000} />
                        <ItemRow
                          icon="🛏️"
                          name="Cama y colchón"
                          forPeople={4}
                          amount={1000000}
                        />
                        <ItemRow
                          icon="💊"
                          name="Medicamentos"
                          forPeople={4}
                          amount={80000}
                        />
                        <ItemRow
                          icon="🔥"
                          name="Cocina a gas"
                          amount={320000}
                        />
                        <ItemRow
                          icon="👞"
                          name="Calzado"
                          forPeople={4}
                          amount={300000}
                        />
                        <ItemRow
                          icon="📝"
                          name="Útiles escolares"
                          forPeople={2}
                          amount={50000}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
                        <h2 className="text-purple-600 font-medium text-sm">
                          Objetos de necesidad secundaria
                        </h2>
                      </div>

                      <div className="space-y-1.5">
                        <ItemRow
                          icon="🔨"
                          name="Herramientas"
                          amount={250000}
                        />
                        <ItemRow icon="🚲" name="Bicicleta" amount={200000} />
                      </div>
                    </div>
                  </div>

                  <hr className="h-[1px] bg-gray-300 my-4" />

                  <div className="flex flex-col gap-1 items-center justify-center px-5">
                    <span className="font-semibold text-gray-800">
                      💸 TOTAL ESTIMADO
                    </span>
                    <span className="text-brand-purple font-bold text-center text-[24px]">
                      $1.440.000 ARS
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

      {loading
        ? "Loading..."
        : cause && (
            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"🎯 Recaudado"} />

                <div className="flex-1 w-full p-5 border border-gray-300 text-gray-700 rounded-2xl gap-3 space-y-3">
                  <span className="text-brand-purple font-bold text-center text-[24px]">
                    $1.440.000 ARS
                  </span>
                  <div className="flex-1 w-full h-4 bg-gray-200 rounded-full mb-2">
                    <div
                      className="h-full bg-purple-gradient rounded-full"
                      style={{ width: `50%` }}
                    />
                  </div>
                  <div className="flex justify-between text-gray-500 text-xs">
                    <div>0 ARS</div>
                    <div>500K ARS</div>
                    <div>1M ARS</div>
                  </div>
                </div>
              </div>
            </section>
          )}

      {loading
        ? "Loading..."
        : cause && (
            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"🤝 Validaciones de la comunidad"} />

                <div className="w-full p-5 border border-gray-300 text-gray-700 rounded-2xl flex flex-col gap-3">
                  <p className="">
                    👍 Validado por{" "}
                    <span className="text-brand-purple font-semibold">
                      24 humanos reales
                    </span>
                    .
                  </p>
                  <p>
                    📸{" "}
                    <span className="text-brand-purple font-semibold">
                      5 personas
                    </span>{" "}
                    han aportado evidencia de las pérdidas materiales.
                  </p>
                </div>
              </div>
            </section>
          )}
      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-col flex-nowrap justify-start gap-1.5">
        <PillButton label="Donar"></PillButton>
        <PillButton label="Validar pedido de *"></PillButton>
      </section>
    </main>
  );
}

interface ItemRowProps {
  icon: string;
  name: string;
  forPeople?: number;
  amount: number;
}

function ItemRow({ icon, name, forPeople, amount }: ItemRowProps) {
  const formatAmount = (amount: number): string => {
    if (amount >= 1_000_000) {
      return (
        (amount / 1_000_000)
          .toFixed(
            amount % 1_000_000 === 0 ? 0 : amount % 100_000 === 0 ? 1 : 3
          )
          .replace(/\.00$/, "") + "M"
      );
    } else {
      return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
        <span className="text-sm">{icon}</span>
        <span className="font-medium text-xs">{name}</span>
        {/* {forPeople && (
          <span className="ml-0.5 bg-blue-100 text-blue-800 border border-blue-200 text-[10px] px-1 py-0.5 rounded-full whitespace-nowrap">
            👥 {forPeople}
          </span>
        )} */}
      </div>
      <div className="bg-black text-white px-2 py-1 rounded-full flex items-center text-xs whitespace-nowrap">
        <span className="text-amber-400 mr-0.5">💰</span>${formatAmount(amount)}
      </div>
    </div>
  );
}
