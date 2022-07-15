import { useState, useEffect } from 'react';
import axios from 'axios';
function HomePage() {

    const [options, setOptions]  = useState(null);
    const [categories, setCategroies] = useState("");
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
        setCategroies(e.target.value);
    }

    if (!loading) {
        return (
            <div>
                <select value={categories} onChange={handleChange}>
                    {options && options.map(option => {
                        return <option key={option.id} value={option.id}>{option.name}</option>
                    }
                    )}
                </select>
            </div>
          )
    } else {
        return <div>Loading...</div>
    }
  
}

export default HomePage