"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp, Bell, Star } from "lucide-react";
import { Card, CardBody, CardHeader, Button, Chip, Divider } from "@nextui-org/react";

// Types for props
interface OptionData {
  name: string;
  price: string;
  change: string;
  positive: boolean;
}

interface IndexDashboardProps {
  indexName: string;
  currentValue?: number;
  change?: number;
  changePercent?: number;
  timePeriodsData?: string[];
  optionsData?: OptionData[];
  chartData?: { x: number; y: number }[];
}

// Default Props
const DEFAULT_OPTIONS_DATA: OptionData[] = [
  { name: "NIFTY 24200 Put", price: "₹73.55", change: "+45.93%", positive: true },
  { name: "NIFTY 24000 Put", price: "₹21.35", change: "+25.69%", positive: true },
  { name: "NIFTY 24300 Call", price: "₹43.75", change: "-71.98%", positive: false },
  { name: "NIFTY 24300 Put", price: "₹141.65", change: "+71.28%", positive: true },
  { name: "NIFTY 24200 Call", price: "₹74.80", change: "-66.22%", positive: false },
];

const DEFAULT_TIME_PERIODS = ["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "All"];

const DEFAULT_CHART_DATA = Array.from({ length: 50 }, (_, i) => ({
  x: i,
  y: 24000 + Math.random() * 1000,
}));

const IndexDashboard: React.FC<IndexDashboardProps> = ({
  indexName,
  currentValue = 24198.85,
  change = -137.15,
  changePercent = -0.56,
  timePeriodsData = DEFAULT_TIME_PERIODS,
  optionsData = DEFAULT_OPTIONS_DATA,
  chartData = DEFAULT_CHART_DATA,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("1D");
  const isNegative = change < 0;

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(Math.abs(num));

  const generateChartPath = () => {
    if (!chartData || chartData.length === 0) return "";

    const maxY = Math.max(...chartData.map((point) => point.y));
    const minY = Math.min(...chartData.map((point) => point.y));
    const range = maxY - minY || 1;

    const scaledPoints = chartData.map((point) => ({
      x: (point.x / (chartData.length - 1 || 1)) * 400,
      y: 200 - ((point.y - minY) / range) * 150,
    }));

    return scaledPoints.reduce((path, point, i) => {
      if (i === 0) return `M ${point.x},${point.y}`;
      const prevPoint = scaledPoints[i - 1];
      const controlX = (prevPoint.x + point.x) / 2;
      return `${path} C ${controlX},${prevPoint.y} ${controlX},${point.y} ${point.x},${point.y}`;
    }, "");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans bg-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel - Main Chart */}
        <Card className="md:col-span-2">
          <CardBody className="p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{indexName}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold">{formatNumber(currentValue)}</span>
                  <Chip
                    startContent={isNegative ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                    color={isNegative ? "danger" : "success"}
                    variant="flat"
                  >
                    {formatNumber(change)} ({formatNumber(changePercent)}%) {selectedPeriod}
                  </Chip>
                </div>
              </div>
              <div className="flex gap-2">
                <Button startContent={<Bell size={16} />} variant="bordered" size="sm">
                  Create Alert
                </Button>
                <Button startContent={<Star size={16} />} variant="bordered" size="sm">
                  Watchlist
                </Button>
              </div>
            </div>

            {/* Time Period Filters */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {timePeriodsData.map((period) => (
                <Chip
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  variant={period === selectedPeriod ? "solid" : "bordered"}
                  className="cursor-pointer"
                >
                  {period}
                </Chip>
              ))}
            </div>

            {/* Chart Area */}
            <div className="w-full h-64">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <path
                  d={generateChartPath()}
                  fill="none"
                  stroke={isNegative ? "#FF4B4B" : "#4ADE80"}
                  strokeWidth="2"
                />
              </svg>
            </div>
          </CardBody>
        </Card>

        {/* Right Panel - Options Chain */}
        <Card>
          <CardHeader className="flex justify-between items-center px-4 py-3">
            <h3 className="text-lg font-semibold">Top {indexName} Options</h3>
            <Button color="success" variant="light" size="sm">
              Option Chain
            </Button>
          </CardHeader>
          <Divider />
          <CardBody className="p-4">
            <div className="space-y-3">
              {optionsData.map((option, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="text-sm">{option.name}</p>
                    <Chip size="sm" color={option.positive ? "success" : "danger"} variant="flat">
                      {option.change}
                    </Chip>
                  </div>
                  <p className="font-semibold">{option.price}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default IndexDashboard;
