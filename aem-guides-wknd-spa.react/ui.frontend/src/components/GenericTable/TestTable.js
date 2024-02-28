import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";


function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

function TestTable({apiUrl}) {
    const [data, setData] = useState([]);

    // Fetch the data from the api url when the component mounts
    useEffect(() => {
        axios
            .get(apiUrl)
            .then((response) => {
                setData(response.data);
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [apiUrl]);

    // generate dynamically columns from first object from array
    const columns = Object.keys(data[0] || []).map((key) => ({
        Header: key,
        accessor: key,
    }));

    return (
        <Table columns={columns} data={data} />
    );
}

export default TestTable;
