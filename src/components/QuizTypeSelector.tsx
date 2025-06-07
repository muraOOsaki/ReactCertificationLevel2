import React, { useState, useEffect, useContext } from 'react';
import {QuizContext} from '../context/QuizContext'

let isFetching = false;

const QuizTypeSelector: React.FC = () => {

  const {setCategory, setDifficulty} = useContext(QuizContext)

  const [foundCategories, setFoundCategories] = useState<Array<{id: number, name: string}>>([]);
  const [error, setError] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState("Select a Category");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Select a Difficulty");

  
  useEffect(() => {
    
    async function fetchCategory() {
      try{
      if(isFetching){
        return;
      }
      isFetching = true;
      setError("");
      const response = await fetch('https://opentdb.com/api_category.php');

      if (!response.ok) {
        throw new Error('An error occurred while fetching category Data');
      }

      const resData = await response.json();
      const categoryList: Array<{id: number, name: string}> =  resData["trivia_categories"];
      //setSelectedCategory(categoryList[0].name);
      setFoundCategories(categoryList.map(({id, name})=>{
        return {id, name}
      }))
    }
    catch(error){
      if(error instanceof Error){
        setError(`${error.message}`);}
        else{
          setError(`Unknown Error: ${error}`)
        }
    }
    }
  
    fetchCategory();
  
    return () => {
      isFetching = false;
    }
  }, []);

  const handleSubmit = () => {
    const chosenCategory = foundCategories.find((eachCategory) => eachCategory.name === selectedCategory)
    if(chosenCategory !== undefined && selectedDifficulty !== 'Select a Difficulty'){
      setCategory(chosenCategory!.id);
      setDifficulty(selectedDifficulty);}
  }

  return (
    <>
      <select id="categorySelect" 
              value={selectedCategory}
              onChange={(e)=>{setSelectedCategory(e.target.value)}}>
              <option value="Select a Category" disabled>
                Select a Category
              </option>
        {
          foundCategories.map
          (({id, name})=>
            {
              // console.log(`id: ${id} , name: ${name}`)
              return <option key={id} value={name}>{name}</option>
            }
          )
        }
      </select>
      <select id="difficultySelect"  value={selectedDifficulty} onChange={(e)=>{setSelectedDifficulty(e.target.value)}}>
        <option value="Select a Difficulty" disabled>
          Select a Difficulty
        </option>
        <option value="Easy">
          Easy
        </option>
        <option value="Medium">
          Medium
        </option>
        <option value="Hard">
          Hard
        </option>
      </select>
      <button id="createBtn" onClick={handleSubmit}>Create Quiz</button>
      {error && <h3>{error}</h3>}
    </>
  );
};


export default QuizTypeSelector;