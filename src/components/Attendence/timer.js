import React, { useEffect, useState } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const red = "#f54e4e";
const green = "#4aec8c";

const AttendenceTimer = (props) => {
  // const [seconds, setSeconds] = useState(900);
  const { seconds } = props;

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setSeconds((prevSeconds) => prevSeconds + 1);
  //     }, 1000);

  //     // Clear the interval on component unmount to avoid memory leaks
  //     return () => clearInterval(intervalId);
  //   }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="bl_timer_bar">
      <CircularProgressbar
        value={(seconds / 28800) * 100}
        // text={(seconds % 60) + ":" + seconds}
        text={`${String(Math.floor(seconds / 3600)).padStart(2, "0")}:
             ${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:
             ${String(seconds % 60).padStart(2, "0")}`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: green,
          fontSize: "4px",
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default AttendenceTimer;
