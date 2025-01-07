import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import axios from 'axios';

const HomePage = () => {
    const [data, setData] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/')
            .then(response => setData(response.data.message))
            .catch(error => console.error('Error fetching home data:', error));
    }, []);

    return (
        <Layout>
            <h1>OnlyBigCars {data || 'Welcome to the Home Page!'}</h1>
        </Layout>
    );
};

export default HomePage;
