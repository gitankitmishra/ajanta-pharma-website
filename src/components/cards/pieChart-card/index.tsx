"use client";
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartOptions,
} from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import Chart.js DataLabels plugin
import { FunctionComponent, useEffect, useRef } from "react";
import "./style.css";

interface PieChartCardProps {
  labels: string[];
  values: number[];
  heading: string;
}

const PieChartCard: FunctionComponent<PieChartCardProps> = ({labels, values,heading}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart<"pie">>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // Destroy previous chart instance if exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        const config: ChartConfiguration<"pie"> = {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                backgroundColor: [
                  "#FE8100CC",
                  "#FE810099",
                  "#FE810066",
                  "#FE810033",
                ],
                data: values,
              },
            ],
          },
          options: {
            plugins: {
              datalabels: {
                color: "#000", // Color of data labels
                font: {
                  weight: 600,
                  size: 24,
                },
                formatter: (value, ctx) => {
                  return value;
                },
              },
            },
          },
        };

        Chart.register(ChartDataLabels); // Register the DataLabels plugin
        chartInstance.current = new Chart(ctx, config);
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, values]);

  return (
    <div className="piechart-card-main-section">
      <div className="piechart-card-header-part">
        <p className="piechart-card-header-heading-text">
         {heading}
        </p>
        <select className="piechart-card-dropdown">
          <option value="not-completed">Not Completed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="piechart-card-chart-part">
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="piechart-card-btn-part">
       <button className="piechart-card-excel-btn">Export to Excel</button>
      </div>
    </div>
  );
};

export default PieChartCard;
