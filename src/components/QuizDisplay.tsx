import React, { useEffect, useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import Answers from './Answers';

const MAX_QUESTION_NOS = 5;

const QuizDisplay: React.FC = () => {
  const { category, difficulty, setCorrectAnswers, setUserAnswers } =
    useContext(QuizContext);
  // console.log("Rendered");
  const [fetchedQuestions, setFetchedQuestions] = useState<Array<{question : string, answers: Array<string>}>>([]);

  useEffect(() => {

    const fetchCategoryQuestions = async () => {
      const response = await fetch(`https://opentdb.com/api.php?amount=${MAX_QUESTION_NOS}&category=${category}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      console.log(response.ok);
      if(!response.ok){
        throw new Error(`Failed to fetch Category: ${category} - ${difficulty} Questions`);
      }

      const resData = await response.json();

      // return resData.results;
      const fetchedQuestions: Array<{type: string, difficulty: string, category: string, question: string, "correct_answer": string, "incorrect_answers": Array<string>}> = resData.results;
      setCorrectAnswers(fetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, answer: eachQuestion["correct_answer"]}}));
      setFetchedQuestions(fetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, answers: [eachQuestion["correct_answer"], ...eachQuestion["incorrect_answers"]]}}));
    }

    fetchCategoryQuestions();
    
  }, [category, difficulty]);

  return <><h2>
    {`Quiz : `}
    {category} - {difficulty}
    </h2>
    <ul>
      {fetchedQuestions.map((eachQuestion)=>{
        return (<>
          <article key={eachQuestion.question}>
          <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: eachQuestion.question}}/>
          <br/>
          <Answers choices={eachQuestion.answers} onSelect={()=>{console.log("dummy")}}/>
          </article>
        </>)
      })}
    </ul>
    </>;
};

export default QuizDisplay;
