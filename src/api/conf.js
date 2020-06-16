import React from 'react';
import axios from 'axios';

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json;',
    }
});