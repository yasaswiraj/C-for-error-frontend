import React from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({ expiryTimestamp }) {
  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => alert("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "1.5rem" }}>
        <span>{timer.minutes}</span>:<span>{timer.seconds}</span>
      </div>
    </div>
  );
}
