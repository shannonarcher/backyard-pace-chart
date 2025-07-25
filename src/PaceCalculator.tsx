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
    <div className="mt-5 max-w-full px-2.5">
      <h2 className="text-2xl text-center">
        Pace Calculator (for {distanceMiles} miles)
      </h2>
      <div className="flex flex-col gap-2.5 items-center">
        <div className="w-full max-w-xs">
          <label className="block mb-1.5">Time (Minutes):</label>
          <input
            type="number"
            min="0"
            value={timeMinutes}
            onChange={(e) => setTimeMinutes(e.target.value)}
            className="w-full p-2 text-base box-border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="w-full max-w-xs">
          <label className="block mb-1.5">Seconds:</label>
          <input
            type="number"
            min="0"
            max="59"
            value={timeSeconds}
            onChange={(e) => setTimeSeconds(e.target.value)}
            className="w-full p-2 text-base box-border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <p className="mt-4 text-center text-base">
        Pace per Mile: {pacePerMileMinutes}:
        {pacePerMileRemainingSeconds.toString().padStart(2, "0")} min/mile
      </p>
      <p className="text-center text-base">
        Pace per Kilometer: {pacePerKmMinutes}:
        {pacePerKmRemainingSeconds.toString().padStart(2, "0")} min/km
      </p>
    </div>
  );
}
