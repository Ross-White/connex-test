import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getTime } from "../api";

const Time = () => {
  const [epochTime, setEpochTime] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);

  const getEpochTime = useCallback(async () => {
    const time = await getTime();
    setEpochTime(time.epoch);
  }, []);

  const getTimeDifference = useCallback(async () => {
    const timeDifference = dayjs().diff(epochTime);

    const diffInHrs = timeDifference / 3600000;
    const hh = Math.floor(diffInHrs);

    const diffInMin = (diffInHrs - hh) * 60;
    const mm = Math.floor(diffInMin);

    const diffInSec = (diffInMin - mm) * 60;
    const ss = Math.floor(diffInSec);

    const formattedHH = hh.toString().padStart(2, "0");
    const formattedMM = mm.toString().padStart(2, "0");
    const formattedSS = ss.toString().padStart(2, "0");

    const differenceString = `${formattedHH}:${formattedMM}:${formattedSS}`;

    setTimeDifference(differenceString);
  }, [epochTime]);

  useEffect(() => {
    getEpochTime();
    const epochInterval = setInterval(() => getEpochTime(), 30000);
    return () => clearInterval(epochInterval);
  }, [getEpochTime]);

  useEffect(() => {
    getTimeDifference();
    const epochInterval = setInterval(() => getTimeDifference(), 1000);
    return () => clearInterval(epochInterval);
  }, [getTimeDifference]);

  return (
    <div>
      <div>
        <p>Server Time </p>
        <p>{epochTime ?? "Loading..."}</p>
      </div>
      <div>
        <p>Time Difference</p>
        <p>{timeDifference ?? "Loading..."}</p>
      </div>
    </div>
  );
};

export default Time;
