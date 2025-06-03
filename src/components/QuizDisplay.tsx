import React, { useEffect, useState, useContext, useRef } from 'react';
import { QuizContext } from '../context/QuizContext';
import Answers from './Answers';
import { Link } from 'react-router';

const MAX_QUESTION_NOS = 5;

const QuizDisplay: React.FC = () => {
  const { category, difficulty, setUserAnswers } =
    useContext(QuizContext);
  
  const [fetchedQuestions, setFetchedQuestions] = useState<Array<{question : string, answers: Array<string>}>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false)
  const answeredQuestions = useRef<Array<{question : string, answer: string}>>([])

  useEffect(() => {

    const fetchCategoryQuestions = async () => {
      setLoading(true);
      const response = await fetch(`https://opentdb.com/api.php?amount=${MAX_QUESTION_NOS}&category=${category}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      // console.log(response.ok);
      if(!response.ok){
        throw new Error(`Failed to fetch Category: ${category} - ${difficulty} Questions`);
      }

      const resData = await response.json();

      // return resData.results;
      const fetchedQuestions: Array<{type: string, difficulty: string, category: string, question: string, "correct_answer": string, "incorrect_answers": Array<string>}> = resData.results;

      setFetchedQuestions(fetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, answers: [eachQuestion["correct_answer"], ...eachQuestion["incorrect_answers"]]}}));
      setLoading(false);
    }

    fetchCategoryQuestions();
    
  }, [category, difficulty]);

  // console.log(fetchedQuestions);
  const handleSelectAnswer = (question: string, selectedAnswer: string) => {
    // console.log("selected answer")
    const index = answeredQuestions.current.findIndex((eachAnswer)=>eachAnswer.question === question)
    if(index === -1){
      answeredQuestions.current.push({question, answer: selectedAnswer})
    }
    else{
      answeredQuestions.current[index].answer = selectedAnswer
    }

    if(answeredQuestions.current.length === MAX_QUESTION_NOS){
      setAllowSubmit(true);
    }
  }

  const handleUnselectAnswer = (question: string) => {
    const index = answeredQuestions.current.findIndex((eachAnswer)=>eachAnswer.question === question)
    if(index > -1){
      // console.log("unselected answer")
      answeredQuestions.current.splice(index, 1);
    }
    setAllowSubmit(false);
  }

  const handleSubmit = () => {
    setUserAnswers([...answeredQuestions.current])
  }

  return <><h2>
    {`Quiz : `}
    {category} - {difficulty}
    </h2>
    {loading && <h2>Loading...</h2>}
    {!loading && <ul>
      {fetchedQuestions.map((eachQuestion)=>{
        return (
          
          <article key={eachQuestion.question}>
          <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: eachQuestion.question}}/>
          <br/>
          <Answers question={eachQuestion.question} answer={eachQuestion.answers[0]} choices={eachQuestion.answers} onSelect={handleSelectAnswer} onUnselect={handleUnselectAnswer}/>
          </article>
          
        )
      })}
    </ul>}
    {allowSubmit && <Link to="/QuizResults" onClick={handleSubmit}>Submit</Link>}
    </>;
};

export default QuizDisplay;
