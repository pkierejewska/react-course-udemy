import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const [enteredFilter, setEnteredFilter] = useState('');

    const {onLoadIngredients} = props;

    useEffect(() => {
        const query =
            enteredFilter.length === 0
                ? ''
                : `?orderBy="title"&equalTo="${enteredFilter}"`;

        fetch('https://hooks-react-2915b-default-rtdb.firebaseio.com/ingredients.json' + query)
            .then(response => response.json())
            .then(responseData => {
                const loadedIngredients = [];
                for (const key in responseData) {
                    loadedIngredients.push({
                        id: key,
                        title: responseData[key].title,
                        amount: responseData[key].amount,
                    });
                }
                console.log(loadedIngredients);
                onLoadIngredients(loadedIngredients);
            });
    }, [enteredFilter, onLoadIngredients])

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
                        type="text"
                        value={enteredFilter}
                        onChange={event => setEnteredFilter(event.target.value)}/>
                </div>
            </Card>
        </section>
    );
});

export default Search;
