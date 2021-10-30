import background from "../Images/pattern.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/style.css";
import Loading from "../Components/Loading";
import { useHistory } from "react-router";
export default function QuestionsList() {
  const [Questions, setQuestions] = useState([]);
  const [SolvedQuestions, setSolvedQuestions] = useState({});
  const [SelectedQuestion, setSelectedQuestion] = useState("");
  const [SelectedQuestionObject, setSelectedQuestionObject] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions`, config)
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const selectQuestion = (questionID, question) => {
    console.log(question);
    if (SelectedQuestion === questionID) {
      setSelectedQuestion("");
      setSelectedQuestionObject("");
    } else {
      setSelectedQuestion(questionID);
      setSelectedQuestionObject(question);
    }
  };

  const sendQuestion = () => {
    const token = localStorage.getItem("token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    console.log("SelectedQuestionObject", SelectedQuestionObject._id);
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/get-date`,
        { questionID: SelectedQuestionObject._id },
        config
      )
      .then((res) => {
        setIsLoading(false);
        history.push({
          pathname: "/question",
          state: {
            question: SelectedQuestionObject,
            id: SelectedQuestionObject._id,
            date: res.data.date,
          },
        });
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };

  const nextButton = () => {
    if (SelectedQuestion !== "")
      return (
        <div
          className="btn mt-3 d-flex align-items-center justify-content-center font-weight-bold fade-in-button"
          style={styles.loginButton}
          onClick={sendQuestion}
        >
          You sure? okay, lets go!
        </div>
      );
  };

  const questionsList = Questions.map((question, i) => {
    return (
      <div
        id={`question-${i}`}
        className={
          SelectedQuestion === `question-${i}` ? "selected-question btn" : "btn"
        }
        style={styles.card}
        onClick={() => {
          selectQuestion(`question-${i}`, question);
        }}
        onMouseOver={() => {
          document.getElementById(`question-${i}`).style.backgroundColor =
            "#FF6B6B";
          document.getElementById(`question-${i}`).style.color = "white";
        }}
        onMouseOut={() => {
          document.getElementById(`question-${i}`).style.backgroundColor =
            "transparent";
          document.getElementById(`question-${i}`).style.color = "#B61919";
        }}
      >
        Question{" "}
        {question._id.substring(question._id.length - 4, question._id.length)}
      </div>
    );
  });

  return (
    <>
      <div
        className="d-flex flex-column min-vh-100 align-items-center justify-content-center"
        style={styles.background}
      >
        <Loading loading={isLoading} />

        {questionsList}
        {nextButton()}
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
    paddingTop: "5rem",
  },
  card: {
    backgroundColor: "transparent",
    borderRadius: 25,
    padding: "0.75rem 10rem",
    boxShadow: "2px 2px 4px rgb(0,0,0,0.2)",
    marginBottom: "0.75rem",
    border: "0.1rem solid #FF6B6B",
    color: "#B61919",
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
    borderRadius: 25,
    padding: "0.75rem 5rem",
    boxShadow: "2px 2px 25px rgb(0,0,0,0.2)",
    marginBottom: "0.75rem",
    color: "white",
    position: "fixed",
    bottom: 0,
  },
};
