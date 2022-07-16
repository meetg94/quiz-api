import { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import API from './API';

function HomePage() {

    const [data, setData] = useState([]);
    const [options, setOptions]  = useState(null);
    const [categories, setCategories] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const apiUrl = "https://opentdb.com/api_category.php";
        setLoading(true);

        axios.get(apiUrl)
            .then(res => {
                setOptions(res.data.trivia_categories);
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
        const submitURL = `https://opentdb.com/api.php?amount=10&category=${categories}&difficulty=${difficulty}`;
        setLoading(true);
        axios.get(submitURL)
            .then(res => {
                setData(res.data.results);
                setLoading(false);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (!loading) {
        return (
            <>
            <div>
                <select value={categories} onChange={handleChange}>
                    {options && options.map(option => {
                        return <option key={option.id} value={option.id}>{option.name}</option>
                    }
                    )}
                </select>
            </div>
            <div>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div>
                    <API 
                        data={data} 
                        />
            </div>
            </>
            )
            } else {
                return <CircularProgress />
            } 
}

export default HomePage