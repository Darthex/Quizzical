import React from 'react'
import Question from "./components/Question.jsx";

export default function App() {

    const [newGame, setNewGame] = React.useState(true)
    const [score, setScore] = React.useState(false)
    const [questionData, setQuestionData] = React.useState({})
    const [answers, setAnswers] = React.useState({})
    const [endGame, setEndgame] = React.useState(false)
    let count = 0

    React.useEffect (() => {
        fetchData()
            .then((data) => setQuestionData(data.results))
    }, [endGame])

    const fetchData = async() => {
        const response = await
            fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        console.log("fetched")
        return response.json()
    }

     function questions() {
        const ques = []
            for (let i = 0; i < 5; i++) {
                ques.push({
                    id: i,
                    isTrue: false,
                    answers: questionData[i].correct_answer,
                    allQuestions: questionData[i].question,
                    wrongAns: questionData[i].incorrect_answers
                })
            }
        console.log(ques)
        return ques
    }

    function handleClick() {
        setNewGame(() => !newGame)
        setAnswers(questions())
    }

    function handleChange(id, any) {
        // setAnswers(oldValue => oldValue.map(newAns => {
        //     return id === newAns.id  ?  {
        //         ...newAns, isTrue: !newAns.isTrue
        //     } : newAns
        // }))

        setAnswers(prevState => prevState.map(ans => {
            if(ans.id=== id) {
                if(any===ans.answers) {
                    return {...ans, isTrue: true}
                } else {
                    return {...ans, isTrue: false}
                }
            } else {
                return ans
            }
        }))
    }

    function handleSubmit() {
        setScore(true)
        setEndgame(true)
        console.log(count)
    }

    function countScore() {
        answers.forEach(value => value.isTrue ===true && count++)
        return count
    }

    function handleNewGame() {
        setScore(false)
        setAnswers(questions())
        setEndgame(false)
    }

    return(
        <main>
            {
                newGame ?
                    <div className="intro--content">
                        <h1 className="intro--heading">Quizzical</h1>
                        <button className="intro--button" onClick={handleClick}>Start Game</button>
                    </div>
                    :
                    <section className="question--section">
                        <div className="question--content">
                            {
                                answers.map((value) => <Question
                                    key={value.id}
                                    questions={value.allQuestions}
                                    options={value.answers}
                                    incorrect={value.wrongAns}
                                    change={(any) => handleChange(value.id, any)}
                                />)
                            }
                        </div>
                        <div className="hmmm">
                        {
                            endGame ?
                                <button onClick={handleNewGame} className="game--button">New Game</button>
                                :
                                <button onClick={handleSubmit} className="game--button">Check answers</button>
                        }
                        {
                            score && <h2 className="score">You Scored {countScore()}/5 !</h2>
                        }
                        </div>
                    </section>
            }
        </main>
    )
}
