"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

// Import the chart component with no SSR
const DoughnutChart = dynamic(() => import("./DoughnutChart"), {
  ssr: false,
})

interface PropertyStatisticsChartProps {
  total: number
  forSale: number
  forRent: number
  rentedOut: number
}

function ChartFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[80%] h-[80%] rounded-full bg-gray-100" />
    </div>
  )
}

export default function PropertyStatisticsChart({ total, forSale, forRent, rentedOut }: PropertyStatisticsChartProps) {
  // Validate that percentages add up to 100
  const totalPercentage = forSale + forRent + rentedOut
  if (totalPercentage !== 100) {
    console.warn(`Property percentages should add up to 100%. Current total: ${totalPercentage}%`)
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center h-[380px]">
        <div className="relative w-[350px] h-[350px]">
          <Suspense fallback={<ChartFallback />}>
            <DoughnutChart
              data={[forSale, forRent, rentedOut]}
              labels={["For sale", "For rent", "Rented out"]}
              colors={["#1e5631", "#8cd98c", "#e6ffe6"]}
              cutout="70%"
            />
          </Suspense>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm text-gray-500">Total Properties</div>
              <div className="text-4xl font-bold">{total}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1e5631]"></div>
            <span>For sale</span>
          </div>
          <span className="font-medium">{forSale}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8cd98c]"></div>
            <span>For rent</span>
          </div>
          <span className="font-medium">{forRent}%</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#e6ffe6]"></div>
            <span>Rented out</span>
          </div>
          <span className="font-medium">{rentedOut}%</span>
        </div>
      </div>
    </div>
  )
}

