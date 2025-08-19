// components/EKGChart.js
import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import Svg, { Polyline } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function EKGChart() {
  const [ekgData, setEkgData] = useState([50, 60, 40, 70, 30, 65, 45, 55]);

  // Fake live EKG updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEkgData((prev) => {
        const next = [...prev.slice(1), 40 + Math.random() * 40];
        return next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Convert to SVG points
  const ekgPoints = ekgData
    .map((val, i) => `${(i / ekgData.length) * width},${100 - val}`)
    .join(" ");

  return (
    <Svg height="100" width={width}>
      <Polyline points={ekgPoints} fill="none" stroke="red" strokeWidth="2" />
    </Svg>
  );
}
