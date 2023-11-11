import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Typing from 'react-typing-animation';
import {DotLoader, HashLoader} from "react-spinners" ;



function App() {

  
  const[currentQuestion, setCurrentQuestion] = useState(0)
  const[cohereResponse, setCohereResponse] = useState()
  const[currentText, setCurrentText] = useState("")
  const[chosenGrade, setChosenGrade] = useState(false)
  const[userGrade, setUserGrade] = useState()
  const[loading, setLoading] = useState(false)

  const questions = ["What's your name? ", "Ask Question: "]

  const handleSubmit = async() => {
    
    setLoading(true)
    
    
    if(currentQuestion === 0) {
      
      const response = await axios.get(`http://localhost:5000/api/sayhi/${currentText}`)
      setCohereResponse(response.data)
      setLoading(false)
      setCurrentQuestion((currentQuestion) => currentQuestion + 1)
    
    }

    else {
      const response = await axios.get(`http://localhost:5000/api/data/${currentText + "_" + userGrade}`)
      const r = await axios.get(`http://localhost:5000/api/classify/${currentText}`)

      if (r.data === 0) {

        setCohereResponse("Sorry this goes outside of my area of expertise") ;

      } else {
        setCohereResponse(response.data)

      }
      setLoading(false)
    }

    
  }


  const handleTextChange = (e) => {
    e.preventDefault()
    setCurrentText(e.target.value)
  }

  const handleClickedGrade = (text) => {
    setChosenGrade(true)
    setUserGrade(text)
    console.log(text)
  }

  
  



  return (
    <>
      <div className="bg">
      <div className='title'>
        <h1>My Tutor</h1>
      </div>

      {!loading ? 
      <div className="App">
        
        {chosenGrade ? 
        <>
        <h1>{questions[currentQuestion]}</h1>
        
        <form onSubmit={handleSubmit}>
        <input onChange={e => handleTextChange(e)} type="text" id="checkbox1" />
        </form>
        </>
        : null}
        
        
        {!chosenGrade ? 
        <>
        <h1>Choose Your Grade Level: </h1>
        <div className="buttons">
        <button onClick = {() => handleClickedGrade("Grade 1-6")}>Grade 1-6</button>
        <button onClick = {() => handleClickedGrade("Grade 6-8")}>Grade 6-8</button>
        <button onClick = {() => handleClickedGrade("Grade 9-12")}>Grade 9-12</button>
        <button onClick = {() => handleClickedGrade("Post-Secondary")}>Post-Secondary</button>
        </div>
        </>
        : null}
        
        {cohereResponse ? 
        <>
          <div className='response-box'>
            <Typing speed={20}>
            <h1>{cohereResponse}</h1>
            </Typing>
          </div>
          <br/>
          <br/>
        </> 
          
          
          : null}
      
      </div>
      
      : <div className='App'>
          <HashLoader color = "black" loading = {true}/>
        </div>}
    </div>
  </>
  
  );

  
}

export default App;
