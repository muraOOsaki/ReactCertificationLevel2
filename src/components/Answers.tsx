import React from "react";
import { useState } from "react";
import classes from './Answers.module.css';

const Answers: React.FC<{choices: Array<string>, onSelect: (arg1: string)=>void}>= ({choices, onSelect}) => {
    
    const [selectedAnswer, setSelectedAnswer] = useState<string>("");

    return <>
        {choices.map((eachChoice) => {
            // console.log(selectedAnswer);
            return <button 
                        key={eachChoice} 
                        className={classes.choiceBtn}
                        style={{backgroundColor: selectedAnswer === eachChoice ? "green" : "", marginRight: "10px", marginBottom: "25px"}}
                        onClick={()=>{setSelectedAnswer(eachChoice)}} 
                        dangerouslySetInnerHTML={{__html: eachChoice}}/>
        })}
    </>
}

export default Answers;