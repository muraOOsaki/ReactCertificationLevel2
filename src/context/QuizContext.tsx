import React, {useState, createContext, type Context} from 'react';

export type Answers = {question: string, answer: string}
const EmptyAnswers : Array<Answers> = [];

export const QuizContext: Context<{
  category: number,
  setCategory: (arg1: number)=>void,
  difficulty: string,
  setDifficulty: (arg1: string)=>void,
  correctAnswers: Array<Answers>,
  setCorrectAnswers: (arg1: Array<Answers>) => void,
  userAnswers: Array<Answers>,
  setUserAnswers: (arg1: Array<Answers>) => void
}> = createContext({
  category: 0,
  setCategory: (arg1: number)=>{},
  difficulty: "",
  setDifficulty: (arg1: string)=>{},
  correctAnswers: [...EmptyAnswers],
  setCorrectAnswers: (arg1: Array<Answers>) => {},
  userAnswers: [...EmptyAnswers],
  setUserAnswers: (arg1: Array<Answers>) => {}
});

const QuizContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const [category, setCategory] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  const [correctAnswers, setCorrectAnswers] = useState<Array<Answers>>([]);
  const [userAnswers, setUserAnswers] = useState<Array<Answers>>([]);

  const handleCategoryChange = (selectedCategory: number) => {
    // console.log("Context setCategory called - " + selectedCategory);
    setCategory(selectedCategory);
  }

  const handleDifficultyChange = (selectedDifficulty: string) => {
    // console.log("Context setDifficulty called - " + selectedDifficulty);
    setDifficulty(selectedDifficulty);
  }

  const handleCorrectAnswers = (correctAnswers: Array<Answers>) => {
    // console.log(correctAnswers);
    setCorrectAnswers(correctAnswers.map((eachAnswer)=>{return {question: eachAnswer.question, answer: eachAnswer.answer}}));
  }

  const handleUserAnswers = (userAnswers: Array<Answers>) => {
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
