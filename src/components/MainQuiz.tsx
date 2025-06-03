import React, { useContext } from 'react';
import QuizTypeSelector from './QuizTypeSelector';
import { QuizContext } from '../context/QuizContext';
import QuizDisplay from './QuizDisplay';

const MainQuiz: React.FC<{}> = () => {
  const { category, difficulty } = useContext(QuizContext);
  return (
    <>
      <h2>Quiz Maker</h2>
      <QuizTypeSelector />
      {(category !== 0 && difficulty !== "") && <QuizDisplay/>}
    </>
  );
};

export default MainQuiz;
