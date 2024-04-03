
"use client"
import { FunctionComponent, useEffect, useRef } from "react";
import Chart, { ChartConfiguration, ChartData, ChartOptions } from "chart.js/auto";
import "./style.css";

interface PieChartCardProps {}

const PieChartCard: FunctionComponent<PieChartCardProps> = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"pie", number[], string>>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Destroy previous chart instance if exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config: ChartConfiguration<"pie", number[], string> = {
          type: "pie",
          data: {
            labels: ["Pune", "Nashik", "Mumbai", "Gujrat"],
            datasets: [
              {
                backgroundColor: [
                  "#FE8100CC",
                  "#FE810099",
                  "#FE810066",
                  "#FE810033",
                ],
                data: [200, 120, 57, 35]
              }
            ]
          }
        };

        chartInstance.current = new Chart(ctx, config);
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="piechart-card-main-section">
      <div className="piechart-card-header-part">
        <p className="piechart-card-header-heading-text">
          Headquarter Wise Status{" "}
        </p>
        <select className="piechart-card-dropdown">
          <option value="not-completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="piechart-card-chart-part">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default PieChartCard;
