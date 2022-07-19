import { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import MaintainQuiz from './MaintainQuiz';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack  from '@mui/material/Stack';

function HomePage() {

    const [data, setData] = useState([]);
    const [options, setOptions]  = useState(null);
    const [categories, setCategories] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [loading, setLoading] = useState(false)
    const [startQuiz, setStartQuiz] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const apiUrl = "https://opentdb.com/api_category.php";
        setLoading(true);

        axios.get(apiUrl)
            .then(res => {
                setOptions(res.data.trivia_categories);
                console.log(res.data.trivia_categories);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }
    , []);

    const handleChange = (e) => {
        setCategories(e.target.value);
    }

    const handleDifficulty = (e) => {
        setDifficulty(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (categories === "" || difficulty === "") {
            setError(true);
        } else {   
        const submitURL = `https://opentdb.com/api.php?amount=10&category=${categories}&difficulty=${difficulty}`;
        setLoading(true);
        axios.get(submitURL)
            .then(res => {
                setData(res.data.results);
                setLoading(false);
                console.log(data);
                setStartQuiz(true);
                setError(false);
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    if (startQuiz) {
        return (
            <div>
                <MaintainQuiz 
                    data={data}
                    />
            </div>
        )
    }

    if (!loading) { return (
            <div className='homepage-container'>
                {error ? <Alert severity="error">Please select a category and difficulty</Alert> : null}
                <h1>Quiz App</h1>
                <p>Built by Meet Guleria</p>
                <p style={{fontSize:"14px"}}>Technologies Used: OpenTDB API, Material UI, ReactJS, Axios</p>
            <div className="category-container">
                    <FormControl style={{minWidth: 300}}>
                        <InputLabel>Select a Category</InputLabel>
                        <Select
                            label="Select a category"
                            value={categories}
                            onChange={handleChange} 
                            MenuProps={{ PaperProps: { sx: {maxHeight: 300 }}}}
                            >
                                {options && options.map(option => {
                                return (
                                    <MenuItem key={option.id} value={option.id} primaryText={option}>
                                        {option.name}
                                    </MenuItem>
                                )
                            })}
                        </Select>
                </FormControl>
            </div>
            <div>
                <FormControl style={{minWidth: 300}}>
                    <InputLabel>Difficulty</InputLabel>
                    <Select 
                        label="Difficulty"
                        value={difficulty} 
                        onChange={(e) => setDifficulty(e.target.value)}
                        MenuProps={{ PaperProps: { sx: {maxHeight: 300 }}}}
                        >
                            <MenuItem value="easy">Easy</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='submit-button'>
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    style={{backgroundColor: '#ff4d00',
                    color: '#fff',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'}}
                    >
                        Start Quiz
                    </Button>
            </div>
            </div>
        )} else {
            <div>
            return <CircularProgress />
            </div>
        }
}

export default HomePage