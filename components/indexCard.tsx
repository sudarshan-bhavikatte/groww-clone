//@ts-nocheck
"use client"
import { Card, Badge } from "@nextui-org/react";

const IndexCard = ({ indexName, currentPrice, dayChange }) => {
  const isPositive = dayChange >= 0;

  return (
    <Card className="h-24 w-64 p-4 mx-auto">
      <div className="flex flex-col h-full justify-between">
        {/* Index Name */}
        <p className="text-lg">{indexName}</p>

        <div className="flex justify-between items-center">
          {/* Current Price */}
          <p className="text-xl font-bold">${currentPrice.toFixed(2)}</p>

          {/* Day Change */}
          <Badge
            color={isPositive ? "success" : "error"}
            variant="flat"
            className="ml-4 text-sm"
          >
            {isPositive ? `+${dayChange.toFixed(2)}%` : `${dayChange.toFixed(2)}%`}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default IndexCard;
