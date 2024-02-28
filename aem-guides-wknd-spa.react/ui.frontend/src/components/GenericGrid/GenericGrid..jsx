import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import axios from 'axios';

// A custom component to render each grid item
const GridItem = ({ data }) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className="grid-item">
                {/* You can customize how to display the data here */}
                <h3>{data.name}</h3>
                <p>{data.email}</p>
            </div>
        </Grid>
    );
};

// A generic grid component that accepts an api url as a prop
const GridComponent = ({ apiUrl }) => {
    const [data, setData] = useState([]);

    // Fetch the data from the api url when the component mounts
    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [apiUrl]);

    return (
        <Grid container spacing={2}>
            {/* Map the data array to grid items */}
            {data.map((item) => (
                <GridItem key={item.id} data={item} />
            ))}
            {console.log(data)}
        </Grid>
    );
};

export default GridComponent;
