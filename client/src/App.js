import "./App.css";
import Time from "./components/Time";
import Metrics from "./components/Metrics";
import React, { useCallback, useEffect, useState } from "react";

import { getTime, getMetrics } from "./api";


const App = () => {
  const [epochTime, setEpochTime] = useState(null);
  const [metrics, setMetrics] = useState(null);

  const getEpochTime = useCallback(async () => {
    const time = await getTime();
    setEpochTime(time.epoch);
  }, []);

  useEffect(() => {
    getEpochTime();
    const epochInterval = setInterval(() => getEpochTime(), 30000);
    return () => clearInterval(epochInterval);
  }, [getEpochTime]);

  useEffect(() => {
    const fetchMetrics = async () => {    
      const metrics = await getMetrics();
      setMetrics(metrics);
    }
    fetchMetrics();
  }, []);

  return (
    <div className="App">
      <header className="App-body">
        <div className="half">
          { epochTime ? <Time epochTime={epochTime} /> : <div>Loading...</div> }
        </div>
        <div className="half">
          { metrics ? <Metrics metrics={metrics} /> : <div>Loading...</div> }
        </div>
      </header>
    </div>
  );
};

export default App;
