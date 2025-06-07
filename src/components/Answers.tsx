import React from "react";
import { useState } from "react";
import "./Answers.css"

const Answers: React.FC<{
                        question: string,
                        answer: string,
                        choices: Array<string>, 
                        onSelect: (arg1: string, arg2: string)=>void, 
                        onUnselect: (arg1: string)=>void
                        }> = ({question, choices, onSelect, onUnselect}) => {

    const [selectedAnswer, setSelectedAnswer] = useState<string>("");
    return <>
        {choices.map((eachChoice) => {
            
            return <button 
                        key={eachChoice} 
                        className="choiceBtn"
                        style={{backgroundColor: selectedAnswer === eachChoice ? "green" : undefined, marginRight: "10px", marginBottom: "25px"}}
                        onClick={()=>{
                            if(eachChoice !== selectedAnswer){
                                
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