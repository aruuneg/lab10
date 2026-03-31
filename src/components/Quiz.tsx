import React, { useRef, useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

const Quiz: React.FC = () => {
  const quizCore = useRef(new QuizCore()).current;
  const [currentQuestion, setCurrentQuestion] = useState(quizCore.getCurrentQuestion());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  }

  const handleButtonClick = (): void => {
    if (selectedAnswer !== null) {
      quizCore.answerQuestion(selectedAnswer);
      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setCurrentQuestion(quizCore.getCurrentQuestion());
        setSelectedAnswer(null);
      } else {
        setIsFinished(true);
      }
    }
  }

  if (isFinished) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <button onClick={handleButtonClick} disabled={selectedAnswer === null}>
        {quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}
      </button>
    </div>
  );
};

export default Quiz;