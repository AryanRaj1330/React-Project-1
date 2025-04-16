import React from "react"
import "./quiz.css"

const Quiz=()=>{
    return(
        <div id="container">
            <div id="track">1/5</div>
            <div id="question">
            <h2>What is the Capital Of India?</h2>
            </div>
            <div id="option-container">
            <ul>
                <li class="options">Mumbai</li>
                <li class="options">New Delhi</li>
                <li class="options">Chennai</li>
                <li class="options">Jaipur</li>
            </ul>
            </div>
            <button>Next</button>
        </div>
    )
}

export default Quiz