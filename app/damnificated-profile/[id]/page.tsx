"use client";

import { ICause } from "@/classes/Cause";
import PillButton from "@/components/Buttons/PillButton";
import ImageCarousel from "@/components/Carousels/Carousel";
import Navbar from "@/components/Navigation/Navbar";
import Subtitle from "@/components/Text/Subtitle";
import { VerifyCauseDevice, VerifyCauseOrb } from "@/components/Verify";
import { disasters } from "@/data/disasters";
import { GetWalletSession } from "@/utils/GetWalletSession";
import { MiniKit } from "@worldcoin/minikit-js";
import Image from "next/image";

import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Ban, Check, Wallet, X } from "lucide-react";
import useExchangeRate from "@/utils/useExchangeRate";
import { handlePay } from "@/components/Pay";

export default function DamnificatedProfile() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();

  const { exchangeRate, exchangeRateLoading } = useExchangeRate();
  const convertUsdToArs = (value: any) => {
    if (exchangeRateLoading) return "...";
    if (exchangeRate) return value * exchangeRate;
  };

  const [wallet, setWallet] = useState<string | undefined>(
    MiniKit.walletAddress || undefined
  );
  const [cause, setCause] = useState<ICause | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const [disaster, setDisaster] = useState<{
    label: string;
    emoji: string;
  } | null>(null);

  const [primaryItems, setPrimaryItems] = useState<
    { priority: string; totalCost: number; amount: number; name: string }[]
  >([]);
  const [secondaryItems, setSecondaryItems] = useState<
    { priority: string; totalCost: number; amount: number; name: string }[]
  >([]);

  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (!id) {
      router.push("/");
      return;
    }

    fetchWallet();
    fetchCauses();
  }, [id]);

  const fetchWallet = async (): Promise<void> => {
    const address = await GetWalletSession();
    if (address && address !== wallet) {
      setWallet(address);
    }
  };

  const fetchCauses = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const request = await fetch(`/api/causes/cause/${id}`);
      if (request.status === 200) {
        const data = await request.json();
        setCause(data.body);
        setDisaster(getDisasterInfo(data.body.cause));
        setPrimaryItems(
          data.body.detail.filter((item: any) => item.priority === "primary")
        );
        setSecondaryItems(
          data.body.detail.filter((item: any) => item.priority === "secondary")
        );
        setPercentage(
          Math.min((data.body.funds / data.body.fundsLimit) * 100, 100)
        );
      }
    } catch (error) {
      console.error("Error fetching cause:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDisasterInfo = (id: string) => {
    const disaster = disasters.find((disaster) => disaster.id === id);
    return disaster ? { label: disaster.label, emoji: disaster.emoji } : null;
  };

  return (
    <main className="bg-white flex min-h-screen flex-col gap-y-5 pb-4 text-black text-[15px]">
      {loading ? (
        <>
          <Navbar title={`Pedido #00000`}></Navbar>

          {/* Profile Section Skeleton */}
          <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
            <div className="flex flex-nowrap gap-3">
              <div className="rounded-full border-[3px] border-transparent bg-gray-200 w-[96px] h-[96px] animate-pulse"></div>
              <div className="flex flex-col gap-1">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mt-1"></div>
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse mt-1"></div>
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mt-1"></div>
              </div>
            </div>
          </section>

          <hr className="h-[1px] bg-gray-300" />

          <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse self-start"></div>
              <div className="flex-1 w-full p-5 border border-gray-300 rounded-2xl">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mt-2"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse mt-2"></div>
              </div>
            </div>
          </section>

          <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse self-start"></div>
              <div className="w-full p-5 border border-gray-300 rounded-2xl">
                <div className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="flex justify-center mt-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
            <div className="flex flex-col items-center justify-center gap-3 w-full">
              <div className="h-6 w-36 bg-gray-200 rounded animate-pulse self-start"></div>
              <div className="w-full py-5 border border-gray-300 rounded-2xl">
                <div className="space-y-4 px-5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-1.5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-1"
                        >
                          <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="h-3 w-3 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="h-4 w-52 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    <div className="space-y-1.5">
                      {[...Array(2)].map((_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-1"
                        >
                          <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                          <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="h-[1px] bg-gray-300 my-4" />

                <div className="flex flex-col gap-1 items-center justify-center px-5">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mt-1"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <div className="h-6 w-28 bg-gray-200 rounded animate-pulse self-start"></div>
              <div className="flex-1 w-full p-5 border border-gray-300 rounded-2xl gap-3 space-y-3">
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mx-auto"></div>
                <div className="flex-1 w-full h-4 bg-gray-200 rounded-full mb-2"></div>
                <div className="flex justify-between">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <div className="h-6 w-52 bg-gray-200 rounded animate-pulse self-start"></div>
              <div className="w-full p-5 border border-gray-300 rounded-2xl flex flex-col gap-3">
                <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-5 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </section>

          <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-col flex-nowrap justify-start gap-1.5">
            <div className="h-12 w-full bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 rounded-full animate-pulse mt-2"></div>
          </section>
        </>
      ) : (
        cause && (
          <>
            <Navbar
              title={`Pedido #${String(cause?.creationIndex).padStart(5, "0")}`}
            />
            <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="flex flex-nowrap gap-3">
                <Image
                  src={cause.profile}
                  className="aspect-square object-cover rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#783BE3] via-[#6028B5] to-[#783BE3] max-w-[96px] max-h-[96px]"
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
                    {disaster?.emoji} {disaster?.label}
                  </p>
                </div>
              </div>
            </section>
            <hr className="h-[1px] bg-gray-300" />

            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"📝 Descripción personal"} />
                <div className="flex-1 w-full p-5 border border-gray-300 text-gray-700 rounded-2xl">
                  <p className="text-[14px]">{cause.description}</p>
                </div>
              </div>
            </section>

            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"📸 Fotos de pérdidas materiales"} />

                <div className="w-full p-5 border border-gray-300 text-gray-700 rounded-2xl">
                  <ImageCarousel images={cause.images} />
                </div>
              </div>
            </section>

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
                        {primaryItems.map((item, index) => (
                          <ItemRow
                            key={index}
                            name={item.name}
                            amount={item.amount}
                            convertUsdToArs={convertUsdToArs}
                          />
                        ))}
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
                        {secondaryItems.map((item, index) => (
                          <ItemRow
                            key={index}
                            name={item.name}
                            amount={item.amount}
                            convertUsdToArs={convertUsdToArs}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <hr className="h-[1px] bg-gray-300 my-4" />

                  <div className="flex flex-col gap-1 items-center justify-center px-5">
                    <span className="font-semibold text-gray-800">
                      💸 TOTAL ESTIMADO
                    </span>
                    <span className="text-brand-purple font-bold text-center text-[24px]">
                      ${convertUsdToArs(cause.fundsLimit)} ARS
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"🎯 Recaudado"} />

                <div className="flex-1 w-full p-5 border border-gray-300 text-gray-700 rounded-2xl gap-3 space-y-3">
                  <h2 className="text-brand-purple font-bold text-center text-[24px]">
                    ${convertUsdToArs(cause.funds)} ARS
                  </h2>
                  <div className="flex-1 w-full h-4 bg-gray-200 rounded-full mb-2">
                    <div
                      className="h-full bg-purple-gradient rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-gray-500 text-xs">
                    <div>{convertUsdToArs(cause.funds)} ARS</div>
                    <div>{convertUsdToArs(cause.fundsLimit)} ARS</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
              <div className="w-full flex flex-col items-center justify-center gap-3">
                <Subtitle content={"🤝 Validaciones de la comunidad"} />

                <div className="w-full p-5 border border-gray-300 text-gray-700 rounded-2xl flex flex-col gap-3">
                  <p className="">
                    👍 Validado por{" "}
                    <span className="text-brand-purple font-semibold">
                      {cause.validations} humanos reales
                    </span>
                    .
                  </p>
                  <p>
                    📸{" "}
                    <span className="text-brand-purple font-semibold">
                      0 personas
                    </span>{" "}
                    han aportado evidencia de las pérdidas materiales.
                  </p>
                </div>
              </div>
            </section>
            <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-col flex-nowrap justify-start gap-1.5">
              {wallet == cause.wallet ? (
                <VerifyCauseOrb cause={cause.uuid} />
              ) : (
                <div className="flex flex-col flex-nowrap justify-start gap-1 5">
                  <PillButton
                    label="Donar"
                    action={() => setIsOpen(true)}
                  ></PillButton>

                  <PillButton
                    label={`Validar pedido de ${cause.owner}`}
                    link={`/validate/${cause.uuid}`}
                  ></PillButton>
                </div>
              )}
            </section>
          </>
        )
      )}

      <AnimatePresence mode="wait">
        {isOpen && cause && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-[320px] rounded-3xl overflow-hidden shadow-xl z-50"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100">
                <h2 className="text-xl font-bold">World Pay</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex items-center gap-3 p-5">
                <div className="bg-purple-600 w-10 h-10 rounded-full flex items-center justify-center">
                  <Image
                    src="/logo/light/icon.png"
                    alt={"Baia logo"}
                    width={20}
                    height={20}
                  ></Image>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">Baia</span>
                    <div className="bg-blue-500 rounded-full p-0.5">
                      <Check size={12} color="white" />
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">:)</span>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <p className="text-gray-600 mb-2">Donar con Worldcoin</p>
                <div className="flex items-center mb-2">
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-3 text-xl font-bold">$</span>
                    <input
                      type="number"
                      value={amount}
                      placeholder={"15.00"}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value)) {
                          setAmount(value);
                        }
                      }}
                      className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-8 pr-3 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>
                <p className="text-gray-500 text-sm italic">
                  Podrás seleccionar la moneda luego de este paso.
                </p>
              </div>

              <div className="p-5">
                {!wallet ? (
                  <button
                    onClick={() => {
                      fetchWallet();
                    }}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl relative overflow-hidden flex flex-row flex-nowrap items-center justify-center gap-2 disabled:bg-gray-600"
                  >
                    Conectar wallet <Wallet />
                  </button>
                ) : (
                  <button
                    disabled={!wallet || amount == undefined || amount <= 0}
                    onClick={() => {
                      if (!wallet || !amount || amount <= 0 || !cause) return;
                      handlePay(wallet, cause.uuid, amount);
                    }}
                    className="w-full bg-gray-900 text-white py-3 rounded-xl relative overflow-hidden flex flex-row flex-nowrap items-center justify-center gap-2 disabled:bg-gray-600"
                  >
                    Siguiente <ArrowRight />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

interface ItemRowProps {
  icon?: string;
  name: string;
  forPeople?: number;
  amount: number;
  convertUsdToArs: any;
}

function ItemRow({
  icon,
  name,
  forPeople,
  amount,
  convertUsdToArs,
}: ItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="font-medium text-xs">{name}</span>
      </div>
      <div className="bg-black text-white px-2 py-1 rounded-full flex items-center text-xs whitespace-nowrap">
        <span className="text-amber-400 mr-0.5">💰</span>$
        {convertUsdToArs(amount)}
      </div>
    </div>
  );
}
