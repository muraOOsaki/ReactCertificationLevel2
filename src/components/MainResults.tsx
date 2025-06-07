import React from "react";
import { useContext } from "react";
import { Link } from "react-router";
import { QuizContext } from "../context/QuizContext";

const MainResults: React.FC = () => {
    const { fetchedQuestions, 
            userAnswers, 
            setCategory, 
            setDifficulty } = useContext(QuizContext)
    

    let score = 0;
    for (const question of fetchedQuestions){
        const index = userAnswers.findIndex((answer)=>answer.question === question.question)
        if(userAnswers[index]!.answer === question.correctAnswer){
            score++;
        }
    }

    return (<>
    <h1>Results</h1>

    {fetchedQuestions.map((eachQuestion)=>{
        return (
          <article key={eachQuestion.question}>
          <p style={{margin: 0}} dangerouslySetInnerHTML={{__html: eachQuestion.question}}/>
          <br/>
          {eachQuestion.options.map((option)=>{
            return (
                    <button key={option} 
                            disabled
                            style={{
                                marginBottom: "25px",
                                color: "white",
                                backgroundColor: 
                                (option === eachQuestion.correctAnswer ? 
                                    "green" :
                                    (option === userAnswers.find(({question}) => question === eachQuestion.question)!.answer ? "red": "")
                                 )
                            }} dangerouslySetInnerHTML={{__html: option}}/>)})}
                    <hr/>
          </article>
        )
        })
    }
    <div style={{
        color: (score >= 2 && score < 4) ? "black" : "white",
        backgroundColor: score < 2 ? "red" : score < 4 ? "yellow" : "green"}}> You scored: {score}</div>
    <button><Link to="/" onClick={()=>{
        setCategory(0);
        setDifficulty("Easy");
    }}>Create a new Quiz</Link></button>
    </>)
}

export default MainResults;