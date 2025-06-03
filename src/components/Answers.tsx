import React, { useContext, useRef } from "react";
import { useState } from "react";
import classes from './Answers.module.css';
import { QuizContext } from "../context/QuizContext";
import type { FetchedQuestion } from "../context/QuizContext";

const Answers: React.FC<{
                        question: string,
                        answer: string,
                        choices: Array<string>, 
                        onSelect: (arg1: string, arg2: string)=>void, 
                        onUnselect: (arg1: string)=>void
                        }> = ({question, answer, choices, onSelect, onUnselect}) => {

    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    const randomChoices = useRef<Array<string>>(null);

    const {setFetchedQuestions: setContextFetchedQuestions} = useContext(QuizContext)
    
    if(!randomChoices.current){
        randomChoices.current = [...choices].sort(()=> Math.random() - 0.5)

        const fetchedQuestion: FetchedQuestion = {question: question, options: [...randomChoices.current], correctAnswer: answer }

        setContextFetchedQuestions(fetchedQuestion)
    }

    return <>
        {randomChoices.current.map((eachChoice) => {
            // console.log(selectedAnswer);
            return <button 
                        key={eachChoice} 
                        className={classes.choiceBtn}
                        style={{backgroundColor: selectedAnswer === eachChoice ? "green" : undefined, marginRight: "10px", marginBottom: "25px"}}
                        onClick={()=>{
                            if(eachChoice !== selectedAnswer){
                                // onUnselect(question)
                                onSelect(question, eachChoice)
                                setSelectedAnswer(eachChoice)
                            }
                            else {
                                onUnselect(question)
                                setSelectedAnswer("")
                            }
                    }} 
                        dangerouslySetInnerHTML={{__html: eachChoice}}/>
        })}
    </>
}

export default Answers;