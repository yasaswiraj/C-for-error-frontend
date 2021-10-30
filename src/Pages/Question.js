import background from "../Images/pattern.svg";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import "./Styles/style.css";
import Timer from "../Components/Timer";
import Loading from "../Components/Loading";

export default function Question(props) {
  const history = useHistory();
  const [time, setTime] = useState(new Date());
  // eslint-disable-next-line
  const [SelectedQuestionID, setSelectedQuestionID] = useState("");
  const [SelectedLine, setSelectedLine] = useState("");
  const [SelectedLineNumber, setSelectedLineNumber] = useState("");
  const [Score, setScore] = useState(0);
  const [Answer, setAnswer] = useState("");
  const [Answered, setAnswered] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
  const [Question, setQuestion] = useState({
    title: "",
    numberOfErrors: 0,
    errorLines: [""],
    lines: [""],
    timeLimit: 0,
  });

  useEffect(() => {
    if (typeof props.location.state != "undefined") {
      setSelectedQuestionID(props.location.state.id);
      setQuestion(props.location.state.question);

      var temp = time;
      console.log(new Date(props.location.state.date));
      temp = new Date(props.location.state.date);
      temp.setSeconds(
        new Date(props.location.state.date).getSeconds() +
          props.location.state.question.timeLimit
      );
      setTime(temp);
    }
  }, [props.location.state]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-score`, config)
      .then((res) => {
        console.log("score", res.data);
        setScore(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [Question._id]);

  const selectLine = (id) => {
    if (SelectedLine === `line-${id}`) {
      setSelectedLine("");
      setSelectedLineNumber("");
    } else {
      setSelectedLine(`line-${id}`);
      setSelectedLineNumber(id);
    }
  };

  const Time = () => {
    var temp = new Date();
    if (typeof props.location.state != "undefined") {
      console.log(new Date(props.location.state.date));
      temp = new Date(props.location.state.date);
      temp.setSeconds(
        new Date(props.location.state.date).getSeconds() +
          props.location.state.question.timeLimit
      );
    }
    console.log(temp);
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/add-solved`,
        {
          questionID: Question._id,
          date: time,
        },
        config
      )
      .then((res) => {
        console.log("score", res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
    return (
      <Timer
        expiryTimestamp={temp}
        id={Question._id}
        score={Score}
        history={history}
        setIsLoading={setIsLoading}
      />
    );
  };

  const LinesList = Question.errorLines.map((line, i) => {
    return (
      <div style={{ marginBottom: "0.2rem", display: "flex" }}>
        <div style={{ width: "1.5rem" }}>{i + 1}.</div>
        <span
          id={`line-${i}`}
          className={
            SelectedLine === `line-${i}` ? "selected-line noselect" : "noselect"
          }
          style={styles.line}
          onClick={() => {
            selectLine(i);
          }}
          onMouseOver={() => {
            document.getElementById(`line-${i}`).style.backgroundColor =
              "#FF6B6B";
            document.getElementById(`line-${i}`).style.color = "white";
          }}
          onMouseOut={() => {
            document.getElementById(`line-${i}`).style.backgroundColor =
              "transparent";
            document.getElementById(`line-${i}`).style.color = "black";
          }}
        >
          {line}
        </span>
      </div>
    );
  });

  const goBack = () => {
    if (typeof props.location.state == "undefined")
      return (
        <Redirect
          to={{
            pathname: "/questions",
            state: {
              from: props.location,
            },
          }}
        />
      );
  };

  const submitAnswer = (e) => {
    if (Answer === "") setError("Answer cannot be empty");
    else if (SelectedLine === "") setError("Select a line");
    else {
      setError("");
      if (
        Question.lines[SelectedLineNumber] ===
        Question.errorLines[SelectedLineNumber]
      )
        setScore(Score - 10);
      else if (
        Question.lines[SelectedLineNumber] === Answer &&
        !Answered.includes(SelectedLineNumber)
      ) {
        setScore(Score + 20);
        setAnswered([...Answered, SelectedLineNumber]);
        if (Question.numberOfErrors === Answered.length + 1) {
          const token = localStorage.getItem("token");
          let config = {
            headers: {
              Authorization: "Bearer " + token,
            },
          };
          console.log(Question._id);
          setIsLoading(true);
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/set-score`,
              {
                questionID: Question._id.toString(),
                score: Score,
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
        }
      } else {
        if (
          Question.lines[SelectedLineNumber] !== Answer &&
          !Answered.includes(SelectedLineNumber)
        ) {
          setScore(Score - 10);
        }
      }
    }
  };
  if (typeof props.location.state != "undefined")
    return (
      <>
        {goBack()}
        <div
          className="d-flex min-vh-100 flex-column align-items-center justify-content-start"
          style={styles.background}
        >
          <Loading loading={isLoading} />

          <div className="container p-3 mb-5 w-75" style={styles.card}>
            <div className="row">
              <div className="col-md-8">
                <h3 className="mb-3" style={{ color: "#B61919", fontSize: 35 }}>
                  {Question.title}
                </h3>
                {LinesList}
                <div className="mt-3 container p-0">
                  <div className="row">
                    <div className="col-md-8">
                      <input
                        style={styles.input}
                        placeholder="Answer"
                        value={Answer}
                        onChange={(e) => {
                          setAnswer(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-4">
                      <div
                        className="col-md-4  btn d-flex align-items-center justify-content-center font-weight-bold"
                        style={styles.submitButton}
                        onClick={submitAnswer}
                      >
                        Submit
                      </div>
                    </div>
                    <div className="text-danger">{error}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 border border-secondary border-1 border-end-0 border-top-0 border-bottom-0">
                <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                  <h4 className="text-dark">Time</h4>
                  {Time()}
                </div>
                <div className="mt-4 w-100 d-flex flex-column justify-content-center align-items-center">
                  <h4 className="text-dark">Score</h4>
                  <div style={{ fontSize: "1.5rem" }}>{Score}</div>
                </div>
                {
                  // <div className="mt-4 w-100 d-flex flex-column justify-content-center align-items-center">
                  //   <h4 className="text-dark">Number of errors</h4>
                  //   <div style={{ fontSize: "1.5rem" }}>
                  //     {Question.numberOfErrors}
                  //   </div>
                  // </div>
                }
                <div className="mt-4 w-100 d-flex flex-column justify-content-center align-items-center">
                  <h4 className="text-dark">Error solved</h4>
                  <div style={{ fontSize: "1.5rem" }}>{Answered.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

const styles = {
  background: {
    backgroundColor: "white",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    padding: "6rem 0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: "0.75rem 15rem",
    boxShadow: "0px 0px 5px rgb(0,0,0,0.2)",
    color: "#B61919",
  },
  line: {
    backgroundColor: "transparent",
    borderRadius: 50,
    padding: "0.1rem 1rem",
    color: "black",
    cursor: "pointer",
  },
  input: {
    border: "0.1rem solid #FF6B6B",
    borderRadius: 50,
    backgroundColor: "transparent",
    width: "100%",
    padding: "0.3rem 1.5rem",
  },
  submitButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 25,
    padding: "0.3rem 0rem",
    marginBottom: "0.75rem",
    color: "white",
  },
};
