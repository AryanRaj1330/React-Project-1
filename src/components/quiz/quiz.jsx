import React, {useEffect,useState} from "react"
import "./quiz.css"

const Quiz=()=>{

    const[setting,setSetting]= useState(false)
    const[amount,setAmount]= useState(5)
    const[difficulty,setDifficulty]= useState("")
    const[category,setCategory]= useState("")
    const[type,setType]= useState("")
    const[questionIndex, setQuestionIndex]= useState(0)
    const[questions,setquestions]= useState([])
    const[isLoading,setIsLoading]= useState(false)
    const[selectedOption,setSelectedOption]= useState(null)
    const[isCorrect,setIsCorrect]= useState(null)
    const[score,setScore]= useState(0)
    const[quizCompleted,setQuizCompleted]= useState(false)
    const[shuffledState,setShuffledState]= useState([])

    useEffect(()=>{
        if(!setting) return

        async function quizData(){
            try{
                let url=`https://opentdb.com/api.php?amount=${amount}`
                if(category) url+=`&category=${category}`
                if(difficulty) url+=`&difficulty=${difficulty}`
                if(type) url+=`&type=${type}`
                const response= await fetch(new Request(url))
                
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
    },[setting])

    useEffect(()=>{
      if(questions.length>0){
        const options=[...questions[questionIndex].incorrect_answers,questions[questionIndex].correct_answer]
        setShuffledState(options.sort(()=>Math.random()-0.5))
      }
    },[questionIndex,questions])

    const optionSelected=(option)=>{
        setSelectedOption(option)
        setIsCorrect(option===questions[questionIndex].correct_answer)
        if(option===questions[questionIndex].correct_answer){
            setScore(prev=>prev+1)
        }
    }

    const nextButton=()=>{
        if(questionIndex<questions.length-1){
            setQuestionIndex(prev=>prev+1)
            setSelectedOption(null)
            setIsCorrect(null)
        }
        else{
            setQuizCompleted(true)
        }
    }

    if(isLoading){
        return(
            <h2>Loading...</h2>
        )
    }

    const message=()=>{
        const percentage=(score/questions.length)*100
        if(percentage<=30) return "Better Luck Next Time! You need a lot Practice."
        else if(percentage>30&&percentage<=70) return "Not Bad, But practice More."
        else if(percentage>70&&percentage<100) return "Well Done!"
        else return "Hooray!! You have done it."
    }

    if(quizCompleted){
        return(
            <div id="container">
                <h2>
                    Quiz Completed!
                </h2>
                <p> Your Score: {score}/{questions.length}</p>
                <p> {message()}</p>

            </div>
        )
    }

    return(
        <div id="container">
      {!setting ? (
        <>
          <h2>Customize your Quiz.</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setQuestionIndex(0);
              setScore(0);
              setSelectedOption(null);
              setIsCorrect(null);
              setQuizCompleted(false);
              setIsLoading(true);
              setSetting(true);
            }}
          >
            <label>
              Number of Questions:{" "}
              <input
                type="number"
                min="1"
                max="20"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </label>
            <br />
            <label>
              Difficulty:
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
            <br />
            <label>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Any Category</option>
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Films</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals & Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="29">Entertainment: Comics</option>
                <option value="31">Entertainment: Japanese Anime & Manga</option>
                <option value="32">Entertainment: Cartoons & Animations</option>
                <option value="17">Science & Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathematics</option>
                <option value="30">Science: Gadgets</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
              </select>
            </label>
            <br />
            <label>
              Type:
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Any Type</option>
                <option value="multiple">Multiple</option>
                <option value="boolean">True/False</option>
              </select>
            </label>
            <br />
            <button type="submit">Ready</button>
          </form>
        </>
      ) : isLoading ? (
        <h2>Loading...</h2>
      ) : quizCompleted ? (
        <>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score}/{questions.length}</p>
          <p>{message()}</p>
        </>
      ) : (
        <>
          <div id="track">{questionIndex + 1}/{questions.length}</div>
          <div id="question">
            <h2>{questions[questionIndex].question}</h2>
          </div>
      <div id="option-container">
        <ul>
        {shuffledState.map((option,idx)=>{
          let className="options"
          if(selectedOption){
            if(option===questions[questionIndex].correct_answer){
            className+=" correct"
          }
          else if(option===selectedOption){
            className+=" incorrect"
          }
        }
        return (
          <li
            key={idx}
            className={className}
            onClick={() => !selectedOption&&optionSelected(option)}
          >{option}</li>
        );
      })}
    </ul>
  </div>
          <button onClick={nextButton} disabled={!selectedOption}>
            Next
          </button>
        </>
      )}
    </div>
    )
}

export default Quiz


