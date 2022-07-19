import { useState, useEffect} from 'react'
import axios from 'axios'
import RenderChoice from './RenderChoice';
import ScoreBoard from './ScoreBoard';
import { Button } from '@mui/material';

function MaintainQuiz({data}) {
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [previousScore, setPreviousScore] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(false);

    const AnswerCheck = {
        correct: '#00FF00',
        incorrect: '#FF3333',
    }

    const handleAnswer = (answer) => {
        if (answer === data[currentQuestion].correct_answer) {
            setScore(score + 1)
            setCorrectAnswer(!correctAnswer)
        } else {
            setCorrectAnswer(false)
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
        <div className='quiz-container'>
        <ScoreBoard 
            score={score}
            />
        <h1>Quiz App</h1>
        {showResult ? (
            <div>
                <h2>Your score is {score}</h2>
                <Button 
                    variant='contained' 
                    className='answers-button'
                    style={{backgroundColor: '#ff4d00',
                        color: '#fff',
                        fontSize: '1 rem',
                        fontWeight: 'bold'}} 
                    onClick={handleRestart}>Restart</Button>
            </div>
        ) : (
            <div>
            <h1>Question {currentQuestion+1} of {data.length}</h1>
            {data.map ((question, index) => {
                const entities = {
                    '&quot;': '"',
                    '&amp;': '&',
                    '&#039;': "'",
                    '&rdquo;': '"',                }
                if (index === currentQuestion) {
                    const questionQuote = question.question.replace(/&quot;|&amp;|&#039;|&lt;|&gt;|&#x27;/g, (match) => entities[match])
                    return (
                        <div>
                            <h2>{questionQuote}</h2>
                            <RenderChoice 
                                handleAnswer={handleAnswer} 
                                incorrect_answers={question.incorrect_answers} 
                                correct_answer={question.correct_answer}/>
                        </div>
                    )
                }
            }
        )}
        </div>
        )
        }
    </div>
    )
}
export default MaintainQuiz