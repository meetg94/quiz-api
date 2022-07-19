import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/system'

function RenderChoice({correctAnswer, handleAnswer, incorrect_answers, correct_answer}) {

    let answers = [correct_answer, ...incorrect_answers]
    answers = answers.sort(() => Math.random() - 0.5)

  return (
    <div>
        {answers.map ((answer, index) => {
            return (
                <div key={index} className='answers-button'>
                  <li>
                    <Button 
                      variant="contained" 
                      style={{backgroundColor: '#ff4d00',
                        color: '#fff',
                        fontSize: '1 rem',
                        fontWeight: 'bold'}}
                      onClick={() => handleAnswer(answer)}>{answer}</Button>
                  </li>
                </div>
              )
        })}
    </div>
  )
}

export default RenderChoice