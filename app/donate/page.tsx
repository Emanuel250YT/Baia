"use client";

import PrimaryDonationCard from "@/components/Cards/PrimaryDonationCard";
import Navbar from "@/components/Navigation/Navbar";
import { disasters } from "@/data/disasters";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";

import { GetAllCauses } from "@/requests/causes/methods";
import { ICause } from "@/classes/Cause";
import { PrioritiesKeys } from "@/data/causePriority";
import { LoaderCircle } from "lucide-react";

export default function Donate() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [causes, setCauses] = useState<Array<ICause>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 5;
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCauses([]);
    setPage(1);
    loadMoreCauses(1, true);
  }, [selectedFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loadingMore]);

  async function loadMoreCauses(newPage: number, reset: boolean = false) {
    if (loadingMore) return;

    if (!hasMore) return;

    setLoadingMore(true);
    const request = await fetch(
      `/api/causes?page=${newPage}&amountPerPage=${limit}${
        selectedFilter ? `&priority=${selectedFilter}` : ""
      }`
    );

    if (request.status === 200) {
      const data = await request.json();
      if (data.body.length > 0) {
        setHasMore(true);
      } else setHasMore(false);
      setCauses((prevCauses) =>
        reset ? data.body : [...prevCauses, ...data.body]
      );
    }
    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    if (page > 1) {
      loadMoreCauses(page);
    }
  }, [page]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <main className="animate-fade-in bg-white flex min-h-screen flex-col gap-y-5 text-black text-[15px] pb-4">
      <Navbar title="Donar"></Navbar>
      <section className="max-w-[calc(100vw-46px)] mx-auto flex flex-wrap justify-start gap-1.5">
        <div className="overflow-x-scroll">
          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Mayor % recaudado"
              isSelected={selectedFilter === PrioritiesKeys.MajorGoal}
              onClick={() => handleFilterClick(PrioritiesKeys.MajorGoal)}
            />
            <FilterPill
              label="Menor % recaudado"
              isSelected={selectedFilter === PrioritiesKeys.MinorGoal}
              onClick={() => handleFilterClick(PrioritiesKeys.MinorGoal)}
            />
            <FilterPill
              label="Necesidades primarias"
              isSelected={selectedFilter === PrioritiesKeys.Primary}
              onClick={() => handleFilterClick(PrioritiesKeys.Primary)}
            />
          </div>

          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Necesidades secundarias"
              isSelected={selectedFilter === PrioritiesKeys.Secondary}
              onClick={() => handleFilterClick(PrioritiesKeys.Secondary)}
            />
            <FilterPill
              label="Mas validados"
              isSelected={selectedFilter === PrioritiesKeys.MostValidated}
              onClick={() => handleFilterClick(PrioritiesKeys.MostValidated)}
            />
            <FilterPill
              label="Menos validados"
              isSelected={selectedFilter === PrioritiesKeys.PoorValidated}
              onClick={() => handleFilterClick(PrioritiesKeys.PoorValidated)}
            />
          </div>

          <div className="flex gap-2 pb-2 no-scrollbar">
            <FilterPill
              label="Más reciente"
              isSelected={selectedFilter === PrioritiesKeys.Recent}
              onClick={() => handleFilterClick(PrioritiesKeys.Recent)}
            />
            <FilterPill
              label="Más antiguo"
              isSelected={selectedFilter === PrioritiesKeys.Oldest}
              onClick={() => handleFilterClick(PrioritiesKeys.Oldest)}
            />
            <FilterPill
              label="Urgente"
              isSelected={selectedFilter === PrioritiesKeys.Important}
              onClick={() => handleFilterClick(PrioritiesKeys.Important)}
            />
          </div>
        </div>
      </section>
      <section className="max-w-[calc(100vw-46px)] w-full mx-auto flex flex-wrap justify-center gap-3">
        {loading ? (
          <div className="w-full py-5 border border-gray-300 text-gray-700 rounded-2xl">
            <div className="flex flex-col gap-2.5 px-5">
              <div className="flex flex-nowrap gap-3">
                <div className="aspect-square rounded-full border-[3px] border-transparent bg-gradient-to-r from-[#783BE3]/30 via-[#6028B5]/30 to-[#783BE3]/30 w-[56px] h-[56px] animate-pulse" />

                <div className="flex flex-col gap-1">
                  <div className="h-[18px] w-32 bg-gray-200 rounded animate-pulse" />

                  <div className="space-y-1 mt-1">
                    <div className="h-[14px] w-36 bg-gray-200 rounded animate-pulse" />
                    <div className="h-[14px] w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-[14px] w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="h-9 bg-gray-200 rounded-full animate-pulse" />
            </div>

            <hr className="h-[1px] bg-red-100 my-4" />

            <div className="flex gap-[5%] px-5">
              <div className="relative w-[57.5%] flex flex-col justify-center items-center gap-1.5">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse self-start" />

                <div className="w-full">
                  <div className="w-full h-4 bg-gray-200 rounded-full mb-2 animate-pulse" />

                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="relative w-[37.5%] text-center">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mx-auto" />

                <div className="h-[20px] w-12 bg-gray-200 rounded animate-pulse mx-auto mt-1" />
              </div>
            </div>
          </div>
        ) : causes && causes.length > 0 ? (
          <>
            {causes.map((cause) => (
              <PrimaryDonationCard
                key={cause.uuid}
                id={cause.uuid}
                name={cause.owner}
                createdAt={cause.createdAt}
                cause={cause.cause}
                place={cause.place}
                image={cause.profile || "/placeholder.png"}
                collected={cause.funds}
                goal={cause.fundsLimit}
                validations={cause.validations}
              />
            ))}
            {loadingMore && hasMore && (
              <p className="w-full flex-1 flex items-center justify-center text-center"><LoaderCircle className="animate-spin" color="#783BE3" /></p>
            )}
            <div ref={observerRef} className="w-full h-10" />
          </>
        ) : (
          <p className="text-center text-gray-500">No hay causas disponibles</p>
        )}
      </section>
    </main>
  );
}

interface FilterPillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

function FilterPill({ label, isSelected, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`${
        isSelected ? "border-red-400 border-2" : "border-gray-300 border"
      } px-4 py-2 rounded-full text-sm whitespace-nowrap text-gray-700 hover:translate-y-[2px] hover:opacity-90 duration-100`}
    >
      {label}
    </button>
  );
}
