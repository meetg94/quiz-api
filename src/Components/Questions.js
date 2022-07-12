import { useState } from 'react'

function Questions({ data, currentQuestion }) {

    const handleIncorrect = () => {
        data.map(question => {
            if (question.incorrect_answers.length > 0) {
                return question.incorrect_answers.map(answer => {
                    return answer
                }
                )
            }
        })
    }

    let answersArray = []
    

    
  return (
    <div>
    </div>
  )
}

export default Questions