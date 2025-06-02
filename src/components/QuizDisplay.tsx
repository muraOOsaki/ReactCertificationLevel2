import React, { useEffect, useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';

const MAX_QUESTION_NOS = 5;

const QuizDisplay: React.FC = () => {
  const { category, difficulty, setCorrectAnswers, setUserAnswers } =
    useContext(QuizContext);

  const [fetchedQuestions, setFetchedQuestions] = useState([]);

  useEffect(() => {

    const async fetchCategoryQuestions = () => {
      const response = await fetch(`https://opentdb.com/api.php?amount=${MAX_QUESTION_NOS}&category=${category}&difficulty=${difficulty}&type=multiple`)

      if(!response.ok){
        throw new Error("Failed to fetch Category Questions");
      }

      const resData = await response.json();

      return resData.results;
    }

    const apifetchedQuestions = await fetchCategoryQuestions();
    setCorrectAnswers(apifetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, answer: eachQuestion["correct_answer"]}}));
    setFetchedQuestions(apifetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, answers: [eachQuestion["correct_answer"], ...eachQuestion["incorrect_answers"]]}}));

  }, [category, difficulty, setCorrectAnswers]);

  return <h1>Hello</h1>;
};

export default QuizDisplay;
