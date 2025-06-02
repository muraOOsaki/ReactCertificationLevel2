import { useState, useEffect, useContext } from 'react';
import {QuizContext} from '../context/QuizContext'

const QuizTypeSelector: React.FC = () => {

  const {setCategory, setDifficulty} = useContext(QuizContext)

  const [foundCategories, setFoundCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({id: 0, value: "Select a Category"});
  const [selectedDifficulty, setSelectedDifficulty] = useState("Select a Difficulty");
  
  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch('https://opentdb.com/api_category.php');

      if (!response.ok) {
        throw new Error('An error occurred while fetching category Data');
      }

      const resData = await response.json();
      return resData["trivia_categories"];
    }

    const categoryList = await fetchCategory();

    setFoundCategories(categoryList.map(({id, name})=>{
      return {id, name}
    }))

  }, []);

  const handleSubmit = () => {
    setCategory(selectedCategory.id);
    setDifficulty(selectedDifficulty);
  }

  return (
    <>
      <select id="categorySelect" value={selectedCategory.value} onChange={(e)=>{setSelectedCategory({id: e.target.id,value: e.target.value})}}>
        {foundCategories.map(({id, name})=><option key={id} id={id} value={name}>{name}</option>)}
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