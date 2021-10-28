import background from "../Images/pattern.svg";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./Styles/style.css";
import Timer from "../Components/Timer";

export default function Question(props) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 6);
  // eslint-disable-next-line
  const [SelectedQuestionID, setSelectedQuestionID] = useState("");
  const [SelectedLine, setSelectedLine] = useState("");
  const [Answer, setAnswer] = useState("");
  // eslint-disable-next-line
  const [Question, setQuestion] = useState({
    title: "Store element in an array",
    lines: [
      "#include <stdio.h> ",
      "void main()",
      "{",
      "int array[10];",
      "int i;",
      "printf('\n\nRead and Print elements of anarray:\n');",
      "printf('-----------------------------------------\n');",
      "printf('Input 10 elements in the array :\n');",
      "for(i=0; i<10; i--)",
      "{",
      " printf('element - %d :',i);",
      'scanf("%d", &arr[0]);',
      "}",
      "#include <stdio.h> ",
      "void main()",
      "{",
      "int array[10];",
      "int i;",
      "printf('\n\nRead and Print elements of anarray:\n');",
      "printf('-----------------------------------------\n');",
      "printf('Input 10 elements in the array :\n');",
      "for(i=0; i<10; i--)",
      "{",
      " printf('element - %d :',i);",
      'scanf("%d", &arr[0]);',
      "}",
    ],
  });

  const selectLine = (id) => {
    if (SelectedLine === id) setSelectedLine("");
    else setSelectedLine(id);
  };

  const LinesList = Question.lines.map((line, i) => {
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
            selectLine(`line-${i}`);
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

  useEffect(() => {
    if (typeof props.location.state != "undefined")
      setSelectedQuestionID(props.location.state.id);
  }, [props.location.state]);

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

  return (
    <>
      {goBack()}
      <div
        className="d-flex min-vh-100 flex-column align-items-center justify-content-start"
        style={styles.background}
      >
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
                    >
                      Submit
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 border border-secondary border-1 border-end-0 border-top-0 border-bottom-0">
              <div className="w-100 d-flex justify-content-center align-items-center">
                <Timer expiryTimestamp={time} />
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
    paddingTop: "6rem",
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
