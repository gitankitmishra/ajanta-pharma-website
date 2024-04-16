"use client";
import React, { FunctionComponent, useEffect, useState } from "react";
import "./style.css";

interface TotalEnrollmentSpeedometerProps {
  initialValue: number; // Initial value for the gauge (between 0 and 1)
  text: string;
}

const TotalEnrollmentSpeedometer: FunctionComponent<TotalEnrollmentSpeedometerProps> = ({
  initialValue,
  text,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const gaugeElement = document.querySelector<HTMLElement>(
      ".total-enrollment-speedometer-graph-section"
    );

    function setGaugeValue(gauge: HTMLElement, val: number) {
      if (val < 0 || val > 1) {
        return;
      }
      const fillElement = gauge.querySelector<HTMLElement>(
        ".total-enrollment-speedometer-graph-section-fill"
      );
      const coverElement = gauge.querySelector<HTMLElement>(
        ".total-enrollment-speedometer-graph-section-cover"
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
    <div className="total-enrollment-speedometer-main-section">
      <div className="total-enrollment-speedometer-heading-section">
        <p className="total-enrollment-speedometer-header-text">{text}</p>
        <span className="total-enrollment-speedometer-score-text-span">Score</span>
      </div>
      <div className="total-enrollment-speedometer-graph-section"><span className="total-enrollment-speedometer-graph-section-zero-text">0</span>
        <div className="total-enrollment-speedometer-graph-section-body">
          <div className="total-enrollment-speedometer-graph-section-fill"></div>
          <div className="total-enrollment-speedometer-graph-section-cover">{`${Math.round(
            value * 100
          )}%`}</div>
        </div>
        <span className="total-enrollment-speedometer-graph-section-hundred-text">100</span>
      </div>
    </div>
  );
};

export default TotalEnrollmentSpeedometer;
