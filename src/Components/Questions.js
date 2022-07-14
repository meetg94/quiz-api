import { useState } from 'react'
import RenderChoice from './RenderChoice'

function Questions({ data, currentQuestion, handleAnswer }) {

    let questions = data[currentQuestion]
    let questionQuote = questions.question.replace('&quot;', '"')

    return (
        <div>
            <h1>Question {currentQuestion+1} of {data.length}</h1>
            <h2>{questionQuote}</h2>
            <RenderChoice
                handleAnswer={handleAnswer}
                incorrect_answers={questions.incorrect_answers}
                correct_answer={questions.correct_answer}/>
        </div>
    )

}

export default Questions