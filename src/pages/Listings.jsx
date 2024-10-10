import React, { useEffect, useState } from 'react';
import API from '../api/API';

function Listings() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        API.fetchItems().then(data => setItems(data));
    }, []);

    return (
        <div>
            <h1 style={{marginTop:150}}>Listings Page</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Listings;
