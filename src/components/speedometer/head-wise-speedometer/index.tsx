"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import "./style.css";

interface HeadWiseheadSpeedometerProps {
  initialValue: number; // Initial value for the gauge (between 0 and 1)
  text: string;
}

const HeadWiseheadSpeedometer: FunctionComponent<HeadWiseheadSpeedometerProps> = ({
  initialValue,
  text,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const gaugeElement = document.querySelector<HTMLElement>(
      ".head-wise-speedometer-graph-section"
    );

    function setGaugeValue(gauge: HTMLElement, val: number) {
      if (val < 0 || val > 1) {
        return;
      }
      const fillElement = gauge.querySelector<HTMLElement>(
        ".head-wise-speedometer-graph-section-fill"
      );
      const coverElement = gauge.querySelector<HTMLElement>(
        ".head-wise-speedometer-graph-section-cover"
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
    <div className="head-wise-speedometer-main-section">
      <div className="head-wise-speedometer-heading-section">
        <p className="head-wise-speedometer-header-text">{text}</p>
        <span className="head-wise-speedometer-score-text-span">Score</span>
      </div>
      <div className="head-wise-speedometer-graph-section">
        <span className="head-wise-speedometer-graph-section-zero-text">0</span>
        <div className="head-wise-speedometer-graph-section-body">
          <div className="head-wise-speedometer-graph-section-fill"></div>
          <div className="head-wise-speedometer-graph-section-cover">{`${Math.round(
            value * 100
          )}%`}</div>
        </div>
        <span className="head-wise-speedometer-graph-section-hundred-text">100</span>
      </div>
    </div>
  );
};

export default HeadWiseheadSpeedometer;
