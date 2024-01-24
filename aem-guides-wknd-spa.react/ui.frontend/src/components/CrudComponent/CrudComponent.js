import React, { useState, useEffect } from "react";
import axios from "axios";
import {MapTo} from "@adobe/aem-react-editable-components";

const CrudComponentEditConfig = {

    emptyLabel: 'CrudComponent',
    isEmpty: function(props) {
        return !props || !props.backend;
    }
};

// Wrapper function that includes react-open-weather component
function CrudComponentWrapper(props) {
    const server = (props.backend === undefined || props.backend === null) ? 'http://localhost' : props.backend;
    const backendPort = (props.backendPort === undefined || props.port === null) ? '8080' : props.backendPort;
    const [backend, setBackend] = useState(server);
    const [port, setBackendPort] = useState(backendPort);

    // Define state variables for loading, data, and error
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    console.log('Server is:' + backend);
    console.log('Port is:' + port);
    // Define the URL endpoint for the GET request
    const url = backend + ":" + port + "/users";
    console.log('URL:' + url);

    // Use useEffect hook to fetch data when the component mounts
    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []); // Pass an empty array as the dependency array to run only once

    // Return the JSX element to render
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default function CrudComponent(props) {

    // render nothing if component not configured
    if (CrudComponentEditConfig.isEmpty(props)) {
        props.backend = 'http://localhost';
        props.backendPort = '8088';
    }

    // render ReactWeather component if component configured
    // pass props to ReactWeatherWrapper. These props include the mapped properties from AEM JSON
    return CrudComponentWrapper(props);

}

// Map Crud Component to AEM component
MapTo('amr-test-37/components/crud-component')(CrudComponent, CrudComponentEditConfig);

