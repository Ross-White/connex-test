import React, { useCallback, useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import { getTime } from "./api"

function App() {
  const [data, setData] = useState(null);
  
  const getEpochTime = useCallback(async () => {
    const time = await getTime();
    setData(time.epoch)
  }, [])
  
  useEffect(() => {
    getEpochTime();
  }, [getEpochTime]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
