import "./App.css";
import Time from "./components/Time";
import Metrics from "./components/Metrics";
import React, { useCallback, useEffect, useState } from "react";

import { getTime } from "./api";


const App = () => {
  const [epochTime, setEpochTime] = useState(null);

  const getEpochTime = useCallback(async () => {
    const time = await getTime();
    setEpochTime(time.epoch);
  }, []);

  useEffect(() => {
    getEpochTime();
    const epochInterval = setInterval(() => getEpochTime(), 30000);
    return () => clearInterval(epochInterval);
  }, [getEpochTime]);

  return (
    <div className="App">
      <header className="App-body">
        <div className="half">
          <Time epochTime={epochTime} />
        </div>
        <div className="half">
          <Metrics />
        </div>
      </header>
    </div>
  );
};

export default App;
