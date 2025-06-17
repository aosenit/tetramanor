"use client"

import { useEffect, useRef, useState } from "react"
import { Chart, type ChartData, type ChartOptions } from "chart.js/auto"

interface DoughnutChartProps {
  data: number[]
  labels: string[]
  colors: string[]
  cutout?: string
}

export default function DoughnutChart({ data, labels, colors, cutout }: DoughnutChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!chartRef.current || !isClient) return
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const chartData: ChartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          borderWidth: 0,
        },
      ],
    }

    const options: ChartOptions<'doughnut'> = {
      responsive: true,
      maintainAspectRatio: true,
      cutout: cutout,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.label}: ${context.parsed}%`,
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: options,
    })

    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, labels, colors, isClient])

  if (!isClient) {
    return <div className="w-full h-full" />
  }

  return <canvas ref={chartRef} className="w-full h-full" />
} 