"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import "./style.css";

interface SpeedometerProps {
  initialValue: number; // Initial value for the gauge (between 0 and 1)
  text: string;
}

const Speedometer: FunctionComponent<SpeedometerProps> = ({
  initialValue,
  text,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const gaugeElement = document.querySelector<HTMLElement>(
      ".speedometer-graph-section"
    );

    function setGaugeValue(gauge: HTMLElement, val: number) {
      if (val < 0 || val > 1) {
        return;
      }
      const fillElement = gauge.querySelector<HTMLElement>(
        ".speedometer-graph-section-fill"
      );
      const coverElement = gauge.querySelector<HTMLElement>(
        ".speedometer-graph-section-cover"
      );

      if (fillElement && coverElement) {
        fillElement.style.transform = `rotate(${val * 180}deg)`;
        coverElement.textContent = `${Math.round(val * 100)}%`;
      }
    }

    if (gaugeElement) {
      setGaugeValue(gaugeElement, value);
    }
  }, [value]);

  return (
    <div className="speedometer-main-section">
      <div className="speedometer-heading-section">
        <p className="speedometer-header-text">{text}</p>
        <span className="speedometer-score-text-span">Score</span>
      </div>
      <div className="speedometer-graph-section"><span className="speedometer-graph-section-zero-text">0</span>
        <div className="speedometer-graph-section-body">
          <div className="speedometer-graph-section-fill"></div>
          <div className="speedometer-graph-section-cover">{`${Math.round(
            value * 100
          )}%`}</div>
        </div>
        <span className="speedometer-graph-section-hundred-text">100</span>
      </div>
    </div>
  );
};

export default Speedometer;
