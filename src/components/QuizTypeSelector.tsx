import { useState, useEffect, useContext } from 'react';
import {QuizContext} from '../context/QuizContext'

const QuizTypeSelector: React.FC = () => {

  const {setFetchedQuestions, setCategory, setDifficulty} = useContext(QuizContext)

  const [foundCategories, setFoundCategories] = useState<Array<{id: number, name: string}>>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  
  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch('https://opentdb.com/api_category.php');

      if (!response.ok) {
        throw new Error('An error occurred while fetching category Data');
      }

      const resData = await response.json();
      const categoryList: Array<{id: number, name: string}> =  resData["trivia_categories"];
      setSelectedCategory(categoryList[0].name);
      setFoundCategories(categoryList.map(({id, name})=>{
        return {id, name}
      }))
    }

    fetchCategory();
  }, []);

  const handleSubmit = () => {
    // console.log(`Create Quiz: ${selectedCategory} - ${selectedDifficulty} `);
    const chosenCategory = foundCategories.find((eachCategory) => eachCategory.name === selectedCategory)
    setFetchedQuestions(null);
    setCategory(chosenCategory!.id);
    setDifficulty(selectedDifficulty);
  }

  return (
    <>
      <select id="categorySelect" 
              value={selectedCategory} 
              onChange={(e)=>{setSelectedCategory(e.target.value)}}>
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
      <select id="difficultySelect" value={selectedDifficulty} onChange={(e)=>{setSelectedDifficulty(e.target.value)}}>
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
    </>
  );
};


export default QuizTypeSelector;