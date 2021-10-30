import { useTimer } from "react-timer-hook";
import axios from "axios";
import Loading from "../Components/Loading";
import { useState } from "react";

export default function Timer({
  expiryTimestamp,
  id,
  score,
  history,
  setIsLoading,
}) {
  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      let config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/set-score`,
          {
            questionID: id.toString(),
            score: score,
          },
          config
        )
        .then((res) => {
          setIsLoading(false);
          console.log(res.data);
          history.push("/questions");
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("error", err);
        });
    },
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "1.5rem" }}>
        <span>{timer.minutes}</span>:<span>{timer.seconds}</span>
      </div>
    </div>
  );
}
