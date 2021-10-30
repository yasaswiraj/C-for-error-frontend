import { useTimer } from "react-timer-hook";
import axios from "axios";

export default function Timer({ expiryTimestamp, id, score, history }) {
  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => {
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
          console.log(res.data);
          history.push("/questions");
        })
        .catch((err) => {
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
