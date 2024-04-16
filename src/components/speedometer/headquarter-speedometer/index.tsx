"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import "./style.css";

interface HeadquarterSpeedometerProps {
  initialValue: number; // Initial value for the gauge (between 0 and 1)
  text: string;
}

const HeadquarterSpeedometer: FunctionComponent<HeadquarterSpeedometerProps> = ({
  initialValue,
  text,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const gaugeElement = document.querySelector<HTMLElement>(
      ".headquarter-speedometer-graph-section"
    );

    function setGaugeValue(gauge: HTMLElement, val: number) {
      if (val < 0 || val > 1) {
        return;
      }
      const fillElement = gauge.querySelector<HTMLElement>(
        ".headquarter-speedometer-graph-section-fill"
      );
      const coverElement = gauge.querySelector<HTMLElement>(
        ".headquarter-speedometer-graph-section-cover"
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
    <div className="headquarter-speedometer-main-section">
      <div className="headquarter-speedometer-heading-section">
        <p className="headquarter-speedometer-header-text">{text}</p>
        <span className="headquarter-speedometer-score-text-span">Score</span>
      </div>
      <div className="headquarter-speedometer-graph-section"><span className="headquarter-speedometer-graph-section-zero-text">0</span>
        <div className="headquarter-speedometer-graph-section-body">
          <div className="headquarter-speedometer-graph-section-fill"></div>
          <div className="headquarter-speedometer-graph-section-cover">{`${Math.round(
            value * 100
          )}%`}</div>
        </div>
        <span className="headquarter-speedometer-graph-section-hundred-text">100</span>
      </div>
    </div>
  );
};

export default HeadquarterSpeedometer;
