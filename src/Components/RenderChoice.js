import Button from '@mui/material/Button';

function RenderChoice({handleAnswer, incorrect_answers, correct_answer}) {

    let answers = [correct_answer, ...incorrect_answers]
    answers = answers.sort(() => Math.random() - 0.5)

  return (
    <div>
        {answers.map ((answer, index) => {
            return (
                <div key={index} className='answers-button'>
                  <li>
                    <Button variant="contained" onClick={() => handleAnswer(answer)}>{answer}</Button>
                  </li>
                </div>
              )
        })}
    </div>
  )
}

export default RenderChoice