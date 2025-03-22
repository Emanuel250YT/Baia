"use client";

import { useState, TouchEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
}
export default function ImageCarousel({images} : ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const swipeThreshold = 50;
    const swipeDistance = touchStart - touchEnd;

    if (swipeDistance > swipeThreshold) {
      goToNext();
    } else if (swipeDistance < -swipeThreshold) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="w-full flex-1">
      <div
        className="relative h-[200px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={goToPrevious}
            className="bg-white/80 rounded-full p-1 shadow-md text-brand-purple"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full flex-shrink-0 px-2">
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src={image || "/uploadImage.png"}
                  alt={`Disaster Image ${index}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={goToNext}
            className="bg-white/80 rounded-full p-1 shadow-md text-brand-purple"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-1 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? "bg-brand-purple" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
