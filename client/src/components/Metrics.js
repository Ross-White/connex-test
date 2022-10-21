import React, { useEffect, useState } from "react";
import { getMetrics } from "../api";

const Metrics = () => {
  const [metrics, setMetrics] = useState(null);


  useEffect(() => {
    const fetchMetrics = async () => {    
      const metrics = await getMetrics();
      setMetrics(metrics);
    }
    fetchMetrics();
  }, []);
  
  return !metrics ? <div>Loading...</div> : <div>{metrics}</div>;
};

export default Metrics;
