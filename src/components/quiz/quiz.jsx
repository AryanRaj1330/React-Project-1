import React, {useEffect,useState} from "react"
import "./quiz.css"

const Quiz=()=>{

    const[questions,setquestions]= useState([])
    const[isLoading,setIsLoading]= useState(true)

    useEffect(()=>{
        async function quizData(){
            try{
                const response= await fetch(new Request("https://api.allorigins.win/raw?url=" + encodeURIComponent("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple")))
                
                const data= await response.json()
                setquestions(data.results)
                setIsLoading(false)
            }
            catch(error){
                console.log(`error=${error}`)
                setIsLoading(false)
            }
        }
        
        quizData()
    },[])

    if(isLoading){
        return(
            <h2>Loading...</h2>
        )
    }
    return(
        <div id="container">
            <div id="track">1/5</div>
            <div id="question">
                {questions.length>0?(
                    <h2 dangerouslySetInnerHTML={{__html:questions[0].question}} />
                ):(
                    <h2>Loading...</h2>                    
                )}
            </div>
            <div id="option-container">
            <ul>
                {questions.length>0&&
                    [...questions[0].incorrect_answers,questions[0].correct_answer]
                    .sort(()=> Math.random()-0.5)
                    .map((option,idx)=>(
                        <li key={idx} className="options" dangerouslySetInnerHTML={{__html:option}} />
                    ))
                }
            </ul>
            </div>
            <button>Next</button>
        </div>
    )
}

export default Quiz


