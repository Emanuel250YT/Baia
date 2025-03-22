"use client";

import PillButton from "@/components/Buttons/PillButton";
import Navbar from "@/components/Navigation/Navbar";
import Image from "next/image";

export default function Donar() {
  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 pb-4 text-black text-[15px]">
      <Navbar title="Pedido #x" returnTo={"/donate"}></Navbar>
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
            <h2 className="text-[18px] font-semibold">Julián Rodríguez</h2>
            <p className="text-[14px]">
              👁️ Verificado con World ID
              <br />
              📅 Publicado el 3/19/25
              <br />
              📍 Bahia Blanca
              <br />
              💧 Inundación
            </p>
          </div>
        </div>
      </section>
      <hr className="h-[1px] bg-gray-300" />
      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2>Descripción personal</h2>
          <div className="w-full p-5 border border-gray-300 text-gray-700 rounded-2xl">
            <p className="text-[14px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
              facere quae cumque minus doloribus id culpa temporibus illo ipsa
              quas et dicta deleniti, architecto explicabo iste rem tempora
              ullam ratione?
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2>Pérdida estimada</h2>
          <div className="w-full p-5 border border-gray-300 text-gray-700 rounded-2xl">
            <div className="space-y-4">
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
                    amount={900000}
                  />
                  <ItemRow
                    icon="💊"
                    name="Medicamentos"
                    forPeople={4}
                    amount={80000}
                  />
                  <ItemRow icon="🔥" name="Cocina a gas" amount={320000} />
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
                  <ItemRow icon="🔨" name="Herramientas" amount={250000} />
                  <ItemRow icon="🚲" name="Bicicleta" amount={200000} />
                </div>
              </div>
            </div>
            <hr className="h-[1px] bg-gray-300 my-4" />
            total estimado $1000
          </div>
        </div>
      </section>
      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <h2>Recaudado</h2>

          <div className="flex-1 w-full">
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
      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <h2>Validaciones de la comunidad</h2>

          <div className="w-full p-5 border border-gray-300 text-gray-700 rounded-2xl">
            <p>Validado por <span>24 humanos reales</span>.</p>
            <p>5 personas han aportado evidencia de las pérdidas materiales.</p>
          </div>
        </div>
      </section>{" "}

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-col flex-nowrap justify-start gap-1.5">
        <PillButton label="Donar"></PillButton>
        <PillButton label="Validar pedido de *"></PillButton>
      </section>{" "}
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
  const formattedAmount = amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
        <span className="text-sm">{icon}</span>
        <span className="font-medium text-xs">{name}</span>
        {forPeople && (
          <span className="ml-0.5 bg-blue-100 text-blue-800 border border-blue-200 text-[10px] px-1 py-0.5 rounded-full whitespace-nowrap">
            👥 {forPeople}
          </span>
        )}
      </div>
      <div className="bg-black text-white px-2 py-1 rounded-full flex items-center text-xs whitespace-nowrap">
        <span className="text-amber-400 mr-0.5">💰</span>${formattedAmount}
      </div>
    </div>
  );
}
