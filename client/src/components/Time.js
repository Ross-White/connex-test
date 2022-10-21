import React, { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";

const Time = (props) => {
  const [timeDifference, setTimeDifference] = useState(null);

  const getTimeDifference = useCallback(async () => {
    const timeDifference = dayjs().diff(props.epochTime);

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
  }, [props.epochTime]);

  useEffect(() => {
    getTimeDifference();
    const epochInterval = setInterval(() => getTimeDifference(), 1000);
    return () => clearInterval(epochInterval);
  }, [getTimeDifference]);

  return (
    <div>
      <div>
        <p>Server Time in Epoch Seconds</p>
        <p>{Math.round(props.epochTime / 1000)}</p>
      </div>
      <div>
        <p>Time Difference</p>
        <p>{timeDifference}</p>
      </div>
    </div>
  );
};

export default Time;
