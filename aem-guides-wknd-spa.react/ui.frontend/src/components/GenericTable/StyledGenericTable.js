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
    }, [apiUrl]);


    const defaultMaterialTheme = createTheme();

    // Generate the columns dynamically from the mapping
    const columns = mapping === 'empty-mapping' ?
        Object.keys(data[0] || []).map((name) => ({
            title: name,
            field: name,
        }))
        :
        Object.entries(mapping).map(([key, value]) => ({
        field: key,
        title: value,
    }));

    return (
        <div>
            <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
                title="Generic Table with Column Mapping"
                columns={columns}
                data={data}
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

