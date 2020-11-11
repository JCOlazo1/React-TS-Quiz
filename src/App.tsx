// This is where the magic happens. This is your "main" file.

import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
// Components:
import QuestionCard from './components/QuestionCard';
// Types:
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10; // Number of questions
const CATEGORY = 15; // The number corresponds to the API's value of what category it is. 15 is for video games.

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0); // 'number' tracks which question number we're on.
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // Start the game
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    // Try to fix this section so it's 'video game questions' only
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
      CATEGORY,
    );

    // Reset everything when it's done
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };



  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer:
      const answer = e.currentTarget.value;

      // Check answer against correct answer:
      const correct = questions[number].correct_answer === answer;

      // Add score if answer is correct:
      if (correct) setScore(prev => prev + 1);

      // Save answer in array of userAnswers:
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move onto the next question as long as it is NOT the last question:
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion)
    }
  };

  return (
    <div className="App">
      <h1>VIDEO GAME QUIZ</h1>
      {/** The Start button is encased in a check so that you can only start the game if its gameOver(true), or all questions are answered */}
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score:</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
}

export default App;
