import { useState } from "react";
import { useHistory } from "react-router-dom";
import background from "../Images/Hexagon.svg";
import axios from "axios";

export default function Login() {
  let history = useHistory();
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!roll || !password) setError("Fields shouldn't be empty");
    else
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          roll_number: roll,
          password: password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data);
          history.push("/round-1");
          setError("");
        })
        .catch(() => {
          console.log("error");
          setError("Invalid credentials");
        });
  };

  return (
    <div
      className="d-flex flex-column vh-100 align-items-center justify-content-center"
      style={styles.background}
    >
      <div style={styles.card}>
        <div
          className="font-weight-bold"
          style={{ color: "#B61919", fontSize: 35 }}
        >
          Let's fix some bugs!
        </div>
        <div className="my-4">
          <input
            style={styles.input}
            placeholder="Roll number"
            value={roll}
            onChange={(e) => {
              var v = e.target.value;
              setRoll(v.toUpperCase());
            }}
          />
          <input
            className="mt-3"
            style={styles.input}
            type="password"
            placeholder="Enter pin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className="btn mt-3 d-flex align-items-center justify-content-center font-weight-bold"
            style={styles.loginButton}
            onClick={handleLogin}
          >
            Login
          </div>
          <div className="mt-2 text-danger">
            <center>{error}</center>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundColor: "#FEF5ED",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  card: {
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 25,
    padding: "7rem 2rem",
    boxShadow: "5px 5px 10px rgb(0,0,0,0.2)",
  },
  input: {
    border: "0.1rem solid #FF6B6B",
    borderRadius: 50,
    backgroundColor: "transparent",
    width: "100%",
    padding: "0.5rem 1.5rem",
  },
  loginButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 50,
    width: "100%",
    padding: "0.5rem 1.5rem",
  },
};