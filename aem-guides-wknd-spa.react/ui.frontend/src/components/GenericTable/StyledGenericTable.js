import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {createTheme, ThemeProvider} from "@mui/material";
import axios from "axios";
import {MapTo} from "@adobe/aem-react-editable-components";

function StyledGenericTableWrapper({apiUrl, mapping}) {
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
    }, [apiUrl, data]);


    const customTheme = createTheme({
        palette: {
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#19857b',
            },
        },
        shape: {
            borderRadius:50
        },
        shadows: ['120px 120px 120px 120px rgba(0,0,0,0.2)'],
        typography: {
            fontSize: 12,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
        }
    });

    function overrideColumnNames(){
        // Create an empty object to store key-value pairs
        const keyValuePairs = {};
        const mappingArray = mapping.split(',');
        const responseKeys = Object.keys(data[0] || []);
        const columnsDisplayedCount = responseKeys.length;

        // construct mapping json from mapping string
        for (let i = 0; i < columnsDisplayedCount; i++) {
            keyValuePairs[Object.values(responseKeys[i]).join('')]= mappingArray[i];
        }

        return Object.entries(keyValuePairs).map(([key, value]) => ({
            field: key,
            title: value,
        }));
    }

    // Generate the columns dynamically from the mapping
    const columns = mapping === 'empty-mapping' ?
        Object.keys(data[0] || []).map((name) => ({
            title: name,
            field: name,
        }))
        : data[0] && overrideColumnNames();

    return (
        <div>
            <ThemeProvider theme={customTheme} >
            <MaterialTable
                title="Generic Table with Column Mapping"
                columns={columns}
                data={data}
                options={{
                    sorting: true,
                    exportButton: true,
                    exportAllData: true
                }}
            />
            </ThemeProvider>
        </div>
    );
}
const StyledGenericTableEditConfig = {

    emptyLabel: 'StyledGenericTable',
    isEmpty: function (props) {
        return !props || !props.apiUrl;
    }
};

export default function StyledGenericTable(props) {
    if (StyledGenericTableEditConfig.isEmpty(props)) {
        props.apiUrl = 'http://localhost:8080';
    }

    return StyledGenericTableWrapper(props);
}


MapTo('amr-test-37/components/generic-table')(StyledGenericTable, StyledGenericTableEditConfig);

