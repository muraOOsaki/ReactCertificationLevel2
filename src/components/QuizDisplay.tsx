import React, { useEffect, useState, useContext, useRef } from 'react';
import { QuizContext } from '../context/QuizContext';
import Answers from './Answers';
import { Link } from 'react-router';

const MAX_QUESTION_NOS = 5;

const QuizDisplay: React.FC = () => {
  const { category, difficulty, setUserAnswers, fetchedQuestions: contextFetchedQuestions, setFetchedQuestions: setContextFetchedQuestions } =
    useContext(QuizContext);
  
  const [_fetchedQuestions, setFetchedQuestions] = useState<Array<{question : string, answers: Array<string>}>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [allowSubmit, setAllowSubmit] = useState<boolean>(false)
  const answeredQuestions = useRef<Array<{question : string, answer: string}>>([])

  const isFetchingRef = useRef<boolean>(false);

  useEffect(() => {

    const fetchCategoryQuestions = async () => {
      if(isFetchingRef.current){
        return;
      }
      
      isFetchingRef.current = true;
      setLoading(true);
      setError("");
      const response = await fetch(`https://opentdb.com/api.php?amount=${MAX_QUESTION_NOS}&category=${category}&difficulty=${difficulty.toLowerCase()}&type=multiple`)
      // console.log(response.ok);
      if(!response.ok){
        if(response.status === 429){
          setError("Server: Too many Requests, Please choose another category and try again");
        }
        else{
          setError(response.statusText);
        }
        throw new Error(`Failed to fetch Category: ${category} - ${difficulty} Questions`);
      }

      const resData = await response.json();

      const responseFetchedQuestions: Array<{type: string, difficulty: string, category: string, question: string, "correct_answer": string, "incorrect_answers": Array<string>}> = resData.results;

      setFetchedQuestions(responseFetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, answers: [eachQuestion["correct_answer"], ...eachQuestion["incorrect_answers"]]}}));
      setContextFetchedQuestions(responseFetchedQuestions.map((eachQuestion)=>{return {question: eachQuestion.question, options: [eachQuestion["correct_answer"], ...eachQuestion["incorrect_answers"]].sort(()=>Math.random()-0.5), correctAnswer: eachQuestion["correct_answer"]} }))
      setLoading(false);
    }

    fetchCategoryQuestions();

    return () => {
      isFetchingRef.current = false;
    }
    
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
    {(loading && error === "") && <h2>Loading...</h2>}
    {(error !== "" && loading) && <h3>{error}</h3>}
    {!loading && <ul>
      {
        contextFetchedQuestions.map((eachQuestion)=>{
          return (
            <article key={eachQuestion.question}>
              <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: eachQuestion.question}}/>
              <br/>
              <Answers question={eachQuestion.question} answer={eachQuestion.correctAnswer} choices={eachQuestion.options} onSelect={handleSelectAnswer} onUnselect={handleUnselectAnswer}/>
            </article>
          )
        })
      }
    </ul>}
    {allowSubmit && <Link to="/QuizResults" onClick={handleSubmit}>Submit</Link>}
    </>;
};

export default QuizDisplay;
