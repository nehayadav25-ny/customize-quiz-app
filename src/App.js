import React, { useState, useEffect, useMemo } from "react";
import { webDevelopmentQuestions } from './data/quizQuestions';
import { mlQuestions } from './data/mlQuestions';
import { aiQuestions } from './data/aiQuestions';
import { cybersecurityQuestions } from './data/cybersecurityQuestions';
import { dataScienceQuestions } from './data/dataScienceQuestions';

const fields = [
  "Web Development",
  "AI",
  "ML",
  "Cybersecurity",
  "Data Science",
];

const levels = ["Easy", "Medium", "Hard"];

const getQuestionsByField = (field) => {
  switch (field) {
    case "Web Development":
      return webDevelopmentQuestions;
    case "ML":
      return mlQuestions;
    case "AI":
      return aiQuestions;
    case "Cybersecurity":
      return cybersecurityQuestions;
    case "Data Science":
      return dataScienceQuestions;
    default:
      return {};
  }
};

function App() {
  const [step, setStep] = useState("selection");
  const [selectedField, setSelectedField] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Memoize questions array to prevent unnecessary recalculations
  const questions = useMemo(() => {
    if (selectedField && selectedLevel) {
      return getQuestionsByField(selectedField)[selectedLevel] || [];
    }
    return [];
  }, [selectedField, selectedLevel]);

  useEffect(() => {
    if (step === "quiz") {
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setScore(null);
    }
  }, [step, selectedField, selectedLevel]);

  const styles = {
    appContainer: {
      maxWidth: 900,
      margin: "1rem auto",
      backgroundColor: "#2c2a4a",
      padding: "2rem",
      borderRadius: 12,
      boxShadow: "0 4px 18px rgba(0,0,0,0.4)",
      color: "white",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      userSelect: "none",
    },
    title: {
      fontWeight: "700",
      letterSpacing: 1.2,
      marginBottom: 16,
    },
    buttonGroup: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "center",
      marginBottom: 24,
    },
    button: (selected) => ({
      flex: "1 0 120px",
      padding: "0.75rem 1.2rem",
      borderRadius: 6,
      backgroundColor: selected ? "#ff6f61" : "#5a55a1",
      border: "none",
      color: "white",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: selected
        ? "0 4px 6px rgba(255,111,97,0.7)"
        : "0 4px 6px rgba(0,0,0,0.3)",
      transition: "background-color 0.3s",
      userSelect: "none",
    }),
    startButton: (disabled) => ({
      marginTop: 32,
      padding: "0.75rem 2rem",
      fontSize: 16,
      border: "none",
      borderRadius: 8,
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      backgroundColor: disabled ? "#d28f8a" : "#ff6f61",
      color: "white",
      boxShadow: disabled ? "none" : "0 4px 10px rgba(255,111,97,0.8)",
    }),
    questionContainer: {
      backgroundColor: "#3b3a66",
      borderRadius: 10,
      padding: "1.5rem 2rem",
      boxShadow: "inset 0 0 15px rgba(0,0,0,0.3)",
      marginBottom: 24,
    },
    questionText: {
      fontSize: 20,
      marginBottom: 16,
    },
    optionsList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    optionItem: (selected) => ({
      backgroundColor: selected ? "#ff6f61" : "#5a55a1",
      padding: "0.8rem 1rem",
      borderRadius: 8,
      fontWeight: 600,
      cursor: "pointer",
      color: "white",
      transition: "background-color 0.3s",
      userSelect: "none",
    }),
    navigationButtons: {
      display: "flex",
      justifyContent: "space-between",
    },
    navButton: (disabled) => ({
      backgroundColor: disabled ? "#d28f8a" : "#ff6f61",
      border: "none",
      borderRadius: 6,
      padding: "0.75rem 1.5rem",
      color: "white",
      fontWeight: "700",
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled
        ? "none"
        : "0 4px 6px rgba(255,111,97,0.8)",
      transition: "background-color 0.3s",
    }),
    progressBar: {
      height: 8,
      borderRadius: 8,
      backgroundColor: "rgba(255,255,255,0.2)",
      overflow: "hidden",
      marginBottom: 24,
    },
    progressBarFill: (widthPercent) => ({
      height: "100%",
      width: `${widthPercent}%`,
      backgroundColor: "#ff6f61",
      transition: "width 0.3s ease-in-out",
    }),
    scoreboard: {
      backgroundColor: "#4a4a7d",
      borderRadius: 10,
      padding: "1rem 1.5rem",
      textAlign: "center",
      fontSize: 18,
      letterSpacing: 1,
      fontWeight: 700,
    },
  };

  if (step === "selection") {
    return (
      <div style={styles.appContainer}>
        <h1 style={styles.title}>Customize Quiz App</h1>
        <h2>Select a field:</h2>
        <div style={styles.buttonGroup}>
          {fields.map((field) => (
            <button
              key={field}
              style={styles.button(field === selectedField)}
              onClick={() => setSelectedField(field)}
              aria-pressed={field === selectedField}
              type="button"
            >
              {field}
            </button>
          ))}
        </div>
        {selectedField && (
          <>
            <h2>Select difficulty level:</h2>
            <div style={styles.buttonGroup}>
              {levels.map((level) => (
                <button
                  key={level}
                  style={styles.button(level === selectedLevel)}
                  onClick={() => setSelectedLevel(level)}
                  aria-pressed={level === selectedLevel}
                  type="button"
                >
                  {level}
                </button>
              ))}
            </div>
          </>
        )}
        <div style={{ textAlign: "center" }}>
          <button
            style={styles.startButton(!(selectedField && selectedLevel))}
            onClick={() => {
              if (selectedField && selectedLevel) setStep("quiz");
            }}
            disabled={!(selectedField && selectedLevel)}
            type="button"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (step === "quiz") {
    if (!questions.length) {
      return (
        <div style={styles.appContainer}>
          <p>No questions available for selected field and level.</p>
          <button
            style={styles.startButton(false)}
            onClick={() => setStep("selection")}
            type="button"
          >
            Go Back
          </button>
        </div>
      );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = userAnswers[currentQuestion.id];
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleOptionSelect = (index) => {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: index,
      }));
    };

    const handleNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };

    const handlePrev = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };

    const handleSubmit = () => {
      let calculatedScore = 0;
      questions.forEach((q) => {
        if (userAnswers[q.id] === q.answerIndex) {
          calculatedScore++;
        }
      });
      setScore(calculatedScore);
      setStep("results");
    };

    return (
      <div style={styles.appContainer}>
        <h2 style={styles.title}>
          {selectedField} - {selectedLevel} Level Quiz
        </h2>
        <div style={styles.progressBar}>
          <div style={styles.progressBarFill(progressPercent)} />
        </div>
        <div style={styles.questionContainer}>
          <div style={styles.questionText}>
            {currentQuestion.questionText}
          </div>
          <ul style={styles.optionsList}>
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                style={styles.optionItem(selectedAnswer === index)}
                onClick={() => handleOptionSelect(index)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOptionSelect(index);
                  }
                }}
                role="button"
                aria-pressed={selectedAnswer === index}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
        <div style={styles.navigationButtons}>
          <button
            style={styles.navButton(currentQuestionIndex === 0)}
            disabled={currentQuestionIndex === 0}
            onClick={handlePrev}
            type="button"
          >
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button
              style={styles.navButton(userAnswers[currentQuestion.id] == null)}
              disabled={userAnswers[currentQuestion.id] == null}
              onClick={handleSubmit}
              type="button"
            >
              Submit
            </button>
          ) : (
            <button
              style={styles.navButton(userAnswers[currentQuestion.id] == null)}
              disabled={userAnswers[currentQuestion.id] == null}
              onClick={handleNext}
              type="button"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }

  if (step === "results") {
    return (
      <div style={styles.appContainer}>
        <h2 style={{ ...styles.title, textAlign: "center" }}>Quiz Results</h2>
        <div style={styles.scoreboard}>
          You scored {score} out of {questions.length} (
          {Math.round((score / questions.length) * 100)}%)
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button
            style={styles.startButton(false)}
            onClick={() => {
              setStep("selection");
              setSelectedField(null);
              setSelectedLevel(null);
              setScore(null);
              setUserAnswers({});
              setCurrentQuestionIndex(0);
            }}
            type="button"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
