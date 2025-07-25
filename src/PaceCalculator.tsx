import { useState } from "react";

// Pace Calculator
export default function PaceCalculator({
  distanceMiles,
}: {
  distanceMiles: number;
}) {
  const [timeMinutes, setTimeMinutes] = useState(52);
  const [timeSeconds, setTimeSeconds] = useState(0);

  // Calculate pace per mile and per km
  const totalTimeInSeconds = timeMinutes * 60 + timeSeconds;
  const pacePerMileSeconds = totalTimeInSeconds / distanceMiles;
  const pacePerMileMinutes = Math.floor(pacePerMileSeconds / 60);
  const pacePerMileRemainingSeconds = Math.round(pacePerMileSeconds % 60);
  const distanceKm = distanceMiles * 1.60934;
  const pacePerKmSeconds = totalTimeInSeconds / distanceKm;
  const pacePerKmMinutes = Math.floor(pacePerKmSeconds / 60);
  const pacePerKmRemainingSeconds = Math.round(pacePerKmSeconds % 60);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Pace Calculator (for {distanceMiles} miles)</h2>
      <div>
        <label>Time (Minutes): </label>
        <input
          type="number"
          min="0"
          value={timeMinutes}
          onChange={(e) =>
            setTimeMinutes(Math.max(0, parseInt(e.target.value) || 0))
          }
          style={{ width: "60px", marginRight: "10px" }}
        />
        <label>Seconds: </label>
        <input
          type="number"
          min="0"
          max="59"
          value={timeSeconds}
          onChange={(e) =>
            setTimeSeconds(
              Math.min(59, Math.max(0, parseInt(e.target.value) || 0)),
            )
          }
          style={{ width: "60px" }}
        />
      </div>
      <p style={{ marginTop: "10px" }}>
        Pace per Mile: {pacePerMileMinutes}:
        {pacePerMileRemainingSeconds.toString().padStart(2, "0")} min/mile
      </p>
      <p>
        Pace per Kilometer: {pacePerKmMinutes}:
        {pacePerKmRemainingSeconds.toString().padStart(2, "0")} min/km
      </p>
    </div>
  );
}
