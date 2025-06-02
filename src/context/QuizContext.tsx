import React, {useState, createContext} from 'react';

export const QuizContext = createContext({
  category: 0,
  setCategory: (arg1: number)=>{},
  difficulty: "",
  setDifficulty: (arg1: string)=>{},
  correctAnswers: [],
  setCorrectAnswers: (arg1: Array<{question: string, answer: string}>) => {},
  userAnswers: [],
  setUserAnswers: (arg1: Array<{question: string, answer: string}>) => {}
});

const QuizContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const [category, setCategory] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  const [correctAnswers, setCorrectAnswers] = useState<Array<{ question: string; answer: string; }>>([]);
  const [userAnswers, setUserAnswers] = useState<Array<{ question: string; answer: string; }>>([]);

  const handleCategoryChange = (selectedCategory: number) => {
    setCategory(selectedCategory);
  }

  const handleDifficultyChange = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
  }

  const handleCorrectAnswers = (correctAnswers: Array<{question: string, answer: string}>) => {
    setCorrectAnswers(correctAnswers.map((eachAnswer)=>{return {question: eachAnswer.question, answer: eachAnswer.answer}}));
  }

  const handleUserAnswers = (userAnswers: Array<{question: string, answer: string}>) => {
    setUserAnswers(userAnswers.map((eachAnswer)=>{return {question: eachAnswer.question, answer: eachAnswer.answer}}));
  }

  const valueQuizContext = {
    category: category,
    setCategory: handleCategoryChange,
    difficulty: difficulty,
    setDifficulty: handleDifficultyChange,
    correctAnswers: correctAnswers,
    setCorrectAnswers: handleCorrectAnswers,
    userAnswers: userAnswers,
    setUserAnswers: handleUserAnswers,
  }

  return <QuizContext.Provider value={valueQuizContext}>
    {children}
  </QuizContext.Provider>
}

export default QuizContextProvider;
