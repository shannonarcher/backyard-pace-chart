import "./App.css";

import PaceCalculator from "./PaceCalculator";
import PaceChart from "./PaceChart";

function App() {
  const distanceMiles = 4.16667;

  return (
    <div>
      <PaceCalculator distanceMiles={distanceMiles} />
      <PaceChart distanceMiles={distanceMiles} />
    </div>
  );
}

export default App;
