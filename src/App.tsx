import './App.css';
import MainQuiz from './components/MainQuiz';
import QuizContextProvider from './context/QuizContext';

function App() {
  return (
    <>
    <QuizContextProvider>
      <MainQuiz />
    </QuizContextProvider>
    </>
  );
}

export default App;
