//@ts-ignore
"use client";
import { useRef, useEffect, useState } from "react";
import IndexCard from "./indexCard";
import { stocksData } from "@/config/stockData";

export default function Index() {
  const scrollContainerRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Set the card width dynamically on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
        //@ts-ignore
      const firstCard = scrollContainerRef.current.querySelector('.index-card');
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth); // Set the width of one card
      }
    }
  }, []);

  const scrollLeft = () => {
    //@ts-ignore
    scrollContainerRef.current.scrollBy({
      left: -cardWidth * 4, // Scroll by the width of 4 cards
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    //@ts-ignore
    scrollContainerRef.current.scrollBy({
      left: cardWidth * 4, // Scroll by the width of 4 cards
      behavior: "smooth",
    });
  };

  return (
    <div className="relative  p-4 rounded-lg shadow-md">
      {/* Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold ">Indices</h2>
        <a href="#" className="text-sm text-blue-500 hover:underline">
          View All
        </a>
      </div>

      {/* Scrollable Cards */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto mx-2 scrollbar-hide"
        >
          {stocksData.map((stock) => (
            <div
              key={stock.id}
              className="index-card flex-shrink-0 basis-1/4 max-w-[25%]" // 1/4 of the container
            >
              <IndexCard
                indexName={stock.indexName}
                currentPrice={stock.currentPrice}
                dayChange={stock.dayChange}
              />
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-700 p-2 rounded-full shadow-lg z-10"
        >
          &lt;
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white hover:bg-gray-700 p-2 rounded-full shadow-lg z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
