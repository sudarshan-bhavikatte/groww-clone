"use client";

import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

const mockTopGainers = [
  { id: 1, name: "Apple Inc.", symbol: "AAPL", gain: "+3.5%", graphColor: "green" },
  { id: 2, name: "Tesla, Inc.", symbol: "TSLA", gain: "+4.2%", graphColor: "blue" },
  { id: 3, name: "Amazon.com, Inc.", symbol: "AMZN", gain: "+2.8%", graphColor: "orange" },
  { id: 4, name: "Microsoft Corporation", symbol: "MSFT", gain: "+5.1%", graphColor: "purple" },
  { id: 5, name: "Alphabet Inc.", symbol: "GOOGL", gain: "+3.7%", graphColor: "red" },
  { id: 6, name: "Meta Platforms, Inc.", symbol: "META", gain: "+6.3%", graphColor: "yellow" },
  { id: 7, name: "NVIDIA Corporation", symbol: "NVDA", gain: "+7.2%", graphColor: "lime" },
];

const MiniGraph = ({ color }: { color: string }) => {
    // Generate random data points for the graph
    const points = Array.from({ length: 10 }, (_, i) => ({
      x: (i / 9) * 100,
      y: 5 + Math.random() * 20,
    }));
  
    // Generate the SVG path (using the points for a smooth curve)
    const pathData = points.reduce((acc, point, idx, arr) => {
      if (idx === 0) return `M${point.x} ${point.y}`;
      const prev = arr[idx - 1];
      const controlX = (prev.x + point.x) / 2;
      return `${acc} Q${controlX} ${prev.y} ${point.x} ${point.y}`;
    }, "");
  
    return (
      <svg className="h-6 w-20" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d={pathData}
          stroke={color}
          strokeWidth="2"
          fill="none"
          className="stroke-current"
        />
      </svg>
    );
  };
  

export default function TopGainers() {
  return (
    <Card className="w-full bg-black">
      <CardBody>
        <div className="h-[400px] overflow-y-auto bg-gray-900 rounded-lg scrollbar-hide">
          <Table
            aria-label="Top gainers table"
            color="primary"
            selectionMode="none"
            className="bg-gray-900 text-white rounded-lg"
          >
            <TableHeader>
              <TableColumn>COMPANY</TableColumn>
              <TableColumn>GRAPH</TableColumn>
              <TableColumn>GAIN</TableColumn>
            </TableHeader>
            <TableBody>
              {mockTopGainers.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{stock.name}</p>
                      <p className="text-gray-400 text-sm">{stock.symbol}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <MiniGraph color={stock.graphColor} />
                  </TableCell>
                  <TableCell className="text-green-500 font-semibold">{stock.gain}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
}
