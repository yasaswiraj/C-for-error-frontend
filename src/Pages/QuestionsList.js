import background from "../Images/pattern.svg";
import { useState } from "react";
import "./Styles/style.css";
import { useHistory } from "react-router";
export default function QuestionsList() {
  const questions = [
    "4efdec03",
    "c8cdadc7",
    "c3bb9e2e",
    "36b53662",
    "87be59d5",
    "3157fe0c",
    "0b62340b",
    "0b62340b",
  ];
  const [SelectedQuestion, setSelectedQuestion] = useState("");

  const history = useHistory();

  const selectQuestion = (id) => {
    if (SelectedQuestion === id) setSelectedQuestion("");
    else setSelectedQuestion(id);
  };

  const nextButton = () => {
    if (SelectedQuestion !== "")
      return (
        <div
          className="btn mt-3 d-flex align-items-center justify-content-center font-weight-bold fade-in-button"
          style={styles.loginButton}
          onClick={() =>
            history.push({
              pathname: "/question",
              state: { id: SelectedQuestion },
            })
          }
        >
          You sure? okay, lets go!
        </div>
      );
  };

  const questionsList = questions.map((question, i) => {
    return (
      <div
        id={`question-${i}`}
        className={
          SelectedQuestion === `question-${i}` ? "selected-question btn" : "btn"
        }
        style={styles.card}
        onClick={() => {
          selectQuestion(`question-${i}`);
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
        Question {question.toUpperCase()}
      </div>
    );
  });

  return (
    <>
      <div
        className="d-flex flex-column vh-100 align-items-center justify-content-center"
        style={styles.background}
      >
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
    boxShadow: "2px 2px 4px rgb(0,0,0,0.2)",
    marginBottom: "0.75rem",
    color: "white",
  },
};