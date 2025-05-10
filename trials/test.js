async function quizData(){
    try{
        const response= await fetch(new Request("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple"),{
            method:"GET",
            headers: new Headers({
                "content-type":"application/json"
            })
        })
        const data= await response.json()
        console.log(data.results[0].question)
    }
    catch(error){
        console.log(`error=${error}`)
    }
}

quizData()