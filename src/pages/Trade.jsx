import React, { useState } from 'react';
import API from '../api/API';

function Trade() {
    const [status, setStatus] = useState('');

    const handleTrade = async () => {
        const result = await API.initiateTrade();
        setStatus(result.message);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: '150px'}}>Trade Page</h1>
            <button onClick={handleTrade} style={{ textAlign: 'center', marginTop: '50px'}}>Initiate Trade</button>
            <p style={{ textAlign: 'center', marginTop: '10px'}}>Status: {status}</p>
        </div>
    );
}

export default Trade;
