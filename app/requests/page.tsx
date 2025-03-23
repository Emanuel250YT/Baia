"use client";

import { ICause } from "@/classes/Cause";
import PillButton from "@/components/Buttons/PillButton";
import PrimaryRequestCard from "@/components/Cards/PrimaryRequestCard";
import Navbar from "@/components/Navigation/Navbar";
import Subtitle from "@/components/Text/Subtitle";
import { formatAmount } from "@/utils/FormatAmount";
import { GetWalletSession } from "@/utils/GetWalletSession";
import useExchangeRate from "@/utils/useExchangeRate";
import { MiniKit } from "@worldcoin/minikit-js";
import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

type DonationNotification = {
  type: "donation";
  amount: number;
  createdAt: string;
};

type ValidationNotification = {
  type: "validation";
  validationId: string;
  createdAt: string;
};

type Notification = DonationNotification | ValidationNotification;

export default function Request() {
  const [wallet, setWallet] = useState<string | null>("");
  const [causes, setCauses] = useState<Array<ICause>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [donations, setDonations] = useState<DonationNotification[]>([]);
  const [validations, setValidations] = useState<ValidationNotification[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [causesPage, setCausesPage] = useState<number>(1);
  const [hasMoreCauses, setHasMoreCauses] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { exchangeRate, exchangeRateLoading } = useExchangeRate();
  const convertUsdToArs = (value: any) => {
    if (exchangeRateLoading) return "...";
    if (exchangeRate) return formatAmount(value * exchangeRate);
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchCauses = async (_wallet: string) => {
    const request = await fetch(
      `/api/causes/${_wallet}?page=${causesPage}&amountPerPage=5`
    );

    if (request.status === 200) {
      const data = await request.json();
      setCauses((prev) => {
        const newCauses = data.body.filter(
          (cause: ICause) => !prev.some((c) => c.uuid === cause.uuid)
        );
        return [...prev, ...newCauses];
      });
      setHasMoreCauses(data.body.length > 0);
    }

    return;
  };

  const fetchWallet = async (): Promise<void> => {
    setLoading(true);
    const address = await GetWalletSession();
    if (address) {
      setWallet(address);
      await fetchCauses(address);
    }

    setLoading(false);
  };

  const fetchNotifications = async () => {
    await fetchWallet();

    if (!MiniKit.walletAddress) {
      return;
    }

    setLoading(true);

    const donationsResponse = await fetch(
      `/api/donations/${MiniKit.walletAddress}?page=${page}&amountPerPage=10`
    );
    if (donationsResponse.status === 200) {
      const data = await donationsResponse.json();
      setDonations(
        data.body.map((donation: any) => ({
          type: "donation",
          amount: donation.amount,
        }))
      );
    }

    // Fetch validations data
    const validationsResponse = await fetch(
      `/api/validations/${MiniKit.walletAddress}?page=${page}&amountPerPage=10`
    );
    if (validationsResponse.status === 200) {
      const data = await validationsResponse.json();
      setValidations(
        data.body.map((validation: any) => ({
          type: "validation",
          validationId: validation.validationId,
        }))
      );
    }
  };

  useEffect(() => {
    const sortedNotifications = [...donations, ...validations].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setNotifications(sortedNotifications);
  }, [donations, validations]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleCausesScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.currentTarget.scrollHeight ===
      e.currentTarget.scrollTop + e.currentTarget.clientHeight;
    if (bottom && !loading && hasMore) {
      setCausesPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <main className="animate-fade-in bg-white flex min-h-screen flex-col gap-y-5 text-black text-[15px]">
      <Navbar title="Tus pedidos de ayuda"></Navbar>

      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
        {loading && !wallet ? (
          <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl animate-pulse">
            <div className="flex flex-row gap-2.5 px-5">
              <div className="flex-1 flex flex-nowrap gap-3">
                <div className="flex flex-col gap-1">
                  <div className="h-4 w-40 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-48 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-56 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="flex flex-nowrap gap-3 items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              </div>
            </div>

            <hr className="h-[1px] bg-gray-200 my-4" />

            <div className="flex gap-[5%] px-5">
              <div className="relative w-[57.5%] flex flex-col justify-center items-center gap-1.5">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="w-full">
                  <div className="w-full h-4 bg-gray-200 rounded-full mb-2"></div>
                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              <div className="relative w-[37.5%] text-center">
                <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-2"></div>
                <div className="h-6 w-12 bg-gray-200 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        ) : !loading && !wallet ? (
          <button
            onClick={() => {
              fetchWallet();
            }}
            className="w-full bg-gray-900 text-white py-3 rounded-xl relative overflow-hidden flex flex-row flex-nowrap items-center justify-center gap-2 disabled:bg-gray-600"
          >
            Conectar wallet <Wallet />
          </button>
        ) : (
          <div onScroll={handleCausesScroll} className="w-full flex-1 flex flex-col flex-nowrap gap-4">
            {!loading &&
              wallet &&
              causes.map((cause, index) => (
                <PrimaryRequestCard
                  key={index}
                  id={cause.uuid}
                  createdAt={cause.createdAt}
                  cause={cause.cause}
                  place={cause.place}
                  collected={cause.funds}
                  goal={cause.fundsLimit}
                  validations={cause.validations}
                ></PrimaryRequestCard>
              ))}
          </div>
        )}
      </section>

      {wallet && (
        <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5">
          <PillButton
            label="Iniciar otro pedido"
            link={"/recieve-donations"}
          ></PillButton>
        </section>
      )}

      <section
        onScroll={handleScroll}
        className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-start gap-1.5"
      >
        <Subtitle content={"🔔 Novedades"} />
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <Notification
              key={index}
              icon={notification.type === "donation" ? "💰" : "👍"}
              label={
                notification.type === "donation"
                  ? `Recibiste una donación de ${convertUsdToArs(
                      notification.amount
                    )} ARS 🎉`
                  : `Recibiste una validación`
              }
            />
          ))
        ) : (
          <span className="text-gray-700 text-[16px] text-center w-full">
            No hay notificaciones aún.
          </span>
        )}
      </section>
    </main>
  );
}

interface NotificationProps {
  icon: string;
  label: string;
}

function Notification({ icon, label }: NotificationProps) {
  return (
    <div className="w-full px-5 py-4 border border-gray-300 text-gray-700 rounded-2xl flex gap-3.5 text-[20px]">
      <div className="bg-brand-purple aspect-square p-2 min-w-[46px] min-h-[46px] rounded-full flex items-center justify-center">
        <span className="text-[20px]">{icon}</span>
      </div>
      <div className="flex items-center justify-center text-gray-500 text-xs flex-[2]">
        <span className="text-[15px]">{label}</span>
      </div>
    </div>
  );
}
