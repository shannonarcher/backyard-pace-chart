import { useMemo } from "react";

// Pace Chart Component
export default function PaceChart({
  distanceMiles,
}: {
  distanceMiles: number;
}) {
  // Generate pace chart data from 40:00 to 59:59 using useMemo for memoization
  const paceChartData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const minutes = 40 + i;
      let totalSeconds = minutes * 60;
      // Adjust the last entry (index 19) to include seconds for 59:59
      if (i === 19) {
        totalSeconds += 59;
      }
      const paceSecondsPerMile = totalSeconds / distanceMiles;
      const paceMinutes = Math.floor(paceSecondsPerMile / 60);
      const paceSeconds = Math.round(paceSecondsPerMile % 60);
      return {
        time: i === 19 ? `59:59` : `${minutes}:00`,
        pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`,
      };
    });
  }, [distanceMiles]);

  // Split data into two chunks for side-by-side display on wider viewports
  const firstHalf = paceChartData.slice(0, 10);
  const secondHalf = paceChartData.slice(10);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Pace Chart (40:00 - 59:59 for {distanceMiles} miles)</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          justifyContent: "space-around",
        }}
      >
        {/* First Table */}
        <table
          style={{
            width: "100%",
            maxWidth: "300px",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Pace per Mile
              </th>
            </tr>
          </thead>
          <tbody>
            {firstHalf.map((entry, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.time}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.pace}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Second Table */}
        <table
          style={{
            width: "100%",
            maxWidth: "300px",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Pace per Mile
              </th>
            </tr>
          </thead>
          <tbody>
            {secondHalf.map((entry, index) => (
              <tr key={index}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.time}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {entry.pace}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
