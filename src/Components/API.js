import { useState, useEffect} from 'react'
import axios from 'axios'

function API() {

    const [data, setData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [previousScore, setPreviousScore] = useState([]);

    const getData = async () => {
        const response = await axios.get('https://opentdb.com/api.php?amount=10')
        setData(response.data.results)
        console.log(response.data.results)
    }

    useEffect(() => {
        getData()
    }
    , [])

    const handleAnswer = (answer) => {
        if (answer === data[currentQuestion].correct_answer) {
            setScore(score + 1)
        }
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < data.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setShowResult(true)
        }
    }

    const handleRestart = () => {
        setScore(0)
        setCurrentQuestion(0)
        setShowResult(false)
        setPreviousScore([...previousScore, score])
    }

  return (
    <div>
        <h1>Quiz Ap</h1>
        <h1>Question {currentQuestion+1} of {data.length}</h1>
        {data.map ((question, index) => {
            if (index === currentQuestion) {
                return (
                    <div>
                        <h2>{question.question}</h2>
                        <button onClick={() => handleAnswer(question.correct_answer)}>{question.correct_answer}</button>
                        <button onClick={() => handleAnswer(question.incorrect_answers[0])}>{question.incorrect_answers[0]}</button>
                        <button onClick={() => handleAnswer(question.incorrect_answers[1])}>{question.incorrect_answers[1]}</button>
                        <button onClick={() => handleAnswer(question.incorrect_answers[2])}>{question.incorrect_answers[2]}</button>
                    </div>
                )
            }})
        }
    </div>
  )
}

export default API