import { useState, useMemo } from "react";

// Pace Calculator
export default function PaceCalculator({
  distanceMiles,
}: {
  distanceMiles: number;
}) {
  const [timeMinutes, setTimeMinutes] = useState("52");
  const [timeSeconds, setTimeSeconds] = useState("0");

  const timeMinutesNum = useMemo(() => {
    const num = Math.max(parseInt(timeMinutes) || 0, 0);
    if (Number.isNaN(num)) {
      return 0;
    }
    return num;
  }, [timeMinutes]);

  const timeSecondsNum = useMemo(() => {
    const num = Math.max(parseInt(timeSeconds) || 0, 0);
    if (Number.isNaN(num)) {
      return 0;
    }
    return num;
  }, [timeSeconds]);

  // Calculate pace per mile and per km
  const totalTimeInSeconds = timeMinutesNum * 60 + timeSecondsNum;
  const pacePerMileSeconds = totalTimeInSeconds / distanceMiles;
  const pacePerMileMinutes = Math.floor(pacePerMileSeconds / 60);
  const pacePerMileRemainingSeconds = Math.round(pacePerMileSeconds % 60);
  const distanceKm = distanceMiles * 1.60934;
  const pacePerKmSeconds = totalTimeInSeconds / distanceKm;
  const pacePerKmMinutes = Math.floor(pacePerKmSeconds / 60);
  const pacePerKmRemainingSeconds = Math.round(pacePerKmSeconds % 60);

  return (
    <div style={{ marginTop: "20px", maxWidth: "100%", padding: "0 10px" }}>
      <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
        Pace Calculator (for {distanceMiles} miles)
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Time (Minutes):
          </label>
          <input
            type="number"
            min="0"
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>
        <div style={{ width: "100%", maxWidth: "300px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>
            Seconds:
          </label>
          <input
            type="number"
            min="0"
            max="59"
            value={timeSeconds}
            onChange={(e) => setTimeSeconds(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "1rem",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
      <p style={{ marginTop: "15px", textAlign: "center", fontSize: "1rem" }}>
        Pace per Mile: {pacePerMileMinutes}:
        {pacePerMileRemainingSeconds.toString().padStart(2, "0")} min/mile
      </p>
      <p style={{ textAlign: "center", fontSize: "1rem" }}>
        Pace per Kilometer: {pacePerKmMinutes}:
        {pacePerKmRemainingSeconds.toString().padStart(2, "0")} min/km
      </p>
    </div>
  );
}
