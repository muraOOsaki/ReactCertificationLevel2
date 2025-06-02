import React, {useState, createContext} from 'react';

export const QuizContext = createContext({
  category: "",
  setCategory: (arg1: string)=>{}
  difficulty: "",
  setDifficulty: (arg1: string)=>{}
  correctAnswers: [],
  addCorrectAnswers: () => {},
  userAnswers: [],
  addUserAnswers: () => {}
});

const QuizContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState("");

  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleCategoryChange = (selectedCategory: number) => {
    setCategory(selectedCategory);
  }

  const handleDifficultyChange = (selectedDifficulty: string) => {
    setCategory(selectedDifficulty);
  }

  const handleCorrectAnswers = (correctAnswers: Array<{question: string, answer: string}>) => {
    setCorrectAnswers(...correctAnswers);
  }

  const handleUserAnswers = (userAnswers: Array<{question: string, answer: string}>) => {
    setUserAnswers(...userAnswers);
  }

  const valueQuizContext = {
    category: category
    setCategory: handleCategoryChange
    difficulty: difficulty
    setDifficulty: handleDifficultyChange
    correctAnswers: correctAnswers
    setCorrectAnswers: handleCorrectAnswers
    userAnswers: userAnswers
    setUserAnswers: handleUserAnswers
  }

  return <QuizContext.Provider value={valueQuizContext}>
    {children}
  </QuizContext.Provider>
}

export default QuizContextProvider;
