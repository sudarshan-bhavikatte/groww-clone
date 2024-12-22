"use client";
import { Card, CardBody } from "@nextui-org/react";
import { useState } from "react";

export default function InvestmentSummary() {
  const investments = [
    { id: 1, name: "Real Estate", value: "$20,000" },
    { id: 2, name: "Stocks", value: "$15,000" },
    { id: 3, name: "Mutual Funds", value: "$10,000" },
    { id: 4, name: "Crypto", value: "$5,000" },
    { id: 5, name: "Gold", value: "$8,000" },
    { id: 6, name: "Bonds", value: "$7,000" },
    { id: 7, name: "Mutual Funds", value: "$10,000" },
    { id: 8, name: "Crypto", value: "$5,000" },
    { id: 9, name: "Gold", value: "$8,000" },
    { id: 10, name: "Bonds", value: "$7,000" },
  ];

  const [showInvestments, setShowInvestments] = useState(false);

  return (
    <Card className="w-[350px] mx-auto shadow-gray-400 bg-black">
      <CardBody className="p-4">
        <div className="flex flex-col gap-4">
          {/* Summary Section with Down Arrow */}
          <div className="flex justify-between items-center gap-2">
            <div className="flex-1 text-center">
              <p className="text-xs font-medium text-gray-700">
                Total Investment
              </p>
              <p className="text-lg font-bold text-blue-500 mt-1">$50,000</p>
            </div>
            <div className="w-px bg-gray-300 h-10"></div>
            <div className="flex-1 text-center">
              <p className="text-xs font-medium text-gray-700">Returns</p>
              <p className="text-lg font-bold text-green-500 mt-1">$12,000</p>
            </div>
            <div
              className="ml-2 cursor-pointer text-blue-500 transition-transform duration-300"
              onClick={() => setShowInvestments((prev) => !prev)}
              style={{ transform: `rotate(${showInvestments ? 180 : 0}deg)` }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Scrollable Investments List */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              showInvestments ? "border-t border-gray-200" : ""
            }`}
            style={{
              maxHeight: showInvestments ? "300px" : "0",
            }}
          >
            <div
              className={`overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-2 bg-black scrollbar-hide`}
              style={{ maxHeight: "300px" }}
            >
              <ul className="space-y-2">
                {investments.map((investment) => (
                  <li
                    key={investment.id}
                    className="flex justify-between items-center p-3 bg-zinc-800 rounded-lg shadow-sm hover:bg-gray-200 group transition-colors duration-300"
                  >
                    <span className="text-white font-medium text-sm group-hover:text-black transition-colors duration-300">
                      {investment.name}
                    </span>
                    <span className="text-blue-500 text-sm group-hover:text-blue-700 transition-colors duration-300">
                      {investment.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
