import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router'
import MainQuiz from './components/MainQuiz';
import QuizContextProvider from './context/QuizContext';
import MainResults from './components/MainResults';

function App() {

  const router = createBrowserRouter([{
    path: "/",
    children: [{
      index: true,
      element: <MainQuiz/>
    },
    {
      path: "/QuizResults",
      element: <MainResults/>
    }
  ]
    
  }])

  return (
    <>
    <QuizContextProvider>
      <RouterProvider router={router}/>
    </QuizContextProvider>
    </>
  );
}

export default App;
