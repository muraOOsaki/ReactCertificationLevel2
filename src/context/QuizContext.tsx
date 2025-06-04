import React, {useState, createContext, type Context} from 'react';

export type Answers = {question: string, answer: string}
export type FetchedQuestion = {question: string, options: Array<string>, correctAnswer: string}
const EmptyAnswers : Array<Answers> = [];
const EmptyQuestionArray : Array<FetchedQuestion> = [];

export const QuizContext: Context<{
  category: number,
  setCategory: (arg1: number)=>void,
  difficulty: string,
  setDifficulty: (arg1: string)=>void,

  fetchedQuestions: Array<FetchedQuestion>,
  setFetchedQuestions: (arg1: Array<FetchedQuestion>) => void,

  userAnswers: Array<Answers>,
  setUserAnswers: (arg1: Array<Answers>) => void,
}> = createContext({
  category: 0,
  setCategory: (_arg1) => {},
  difficulty: "",
  setDifficulty: (_arg1) => {},

  fetchedQuestions: [...EmptyQuestionArray],
  setFetchedQuestions: (_arg1) => {},

  userAnswers: [...EmptyAnswers],
  setUserAnswers: (_arg1) => {}
});

const QuizContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

  const [category, setCategory] = useState(0);
  const [difficulty, setDifficulty] = useState("");

  const handleCategoryChange = (selectedCategory: number) => {
    setCategory(selectedCategory);
  }

  const handleDifficultyChange = (selectedDifficulty: string) => {
    setDifficulty(selectedDifficulty);
  }

  const [fetchedQuestions, setFetchedQuestions] = useState<Array<FetchedQuestion>>([]);
  
  const handleSetFetchedQuestions = (fetchedQuestions: Array<FetchedQuestion>) => {
      if(fetchedQuestions.length > 0){
        setFetchedQuestions(fetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, options: [...eachQuestion.options], correctAnswer: eachQuestion.correctAnswer}}))}
      else{
        setFetchedQuestions([]);
      }
  }

  const [userAnswers, setUserAnswers] = useState<Array<Answers>>([]);

  const handleUserAnswers = (userAnswers: Array<Answers>) => {
    setUserAnswers(userAnswers.map((eachAnswer)=>{return {question: eachAnswer.question, answer: eachAnswer.answer}}));
  }

  const valueQuizContext = {
    category: category,
    setCategory: handleCategoryChange,
    difficulty: difficulty,
    setDifficulty: handleDifficultyChange,

    fetchedQuestions: fetchedQuestions,
    setFetchedQuestions: handleSetFetchedQuestions,

    userAnswers: userAnswers,
    setUserAnswers: handleUserAnswers,
  }

  return <QuizContext.Provider value={valueQuizContext}>
    {children}
  </QuizContext.Provider>
}

export default QuizContextProvider;
