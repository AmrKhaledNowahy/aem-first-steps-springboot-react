import React, {useState, useEffect} from 'react';
import {Button, ButtonGroup, Container, FormText, Table} from 'reactstrap';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, CardMedia, createTheme, ThemeProvider} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {MapTo} from "@adobe/aem-react-editable-components";


function UsersListWrapper(props) {
    // Use useState hook to initialize state
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState([]);

    // Use useEffect hook to fetch data when the component mounts
    useEffect(() => {
        fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []); // Pass an empty array as the dependency array to run only once


    function _handleChangeEvent(event) {
        setUsername(event.target.value);
    }


    // const usersCardList = users.map(user => basicCard(user))
    const usersCardList = users.map(user => basicCard(user))

    return (
        <div>
            <hr></hr>
            &nbsp;
            &nbsp;
            <h3>Add User</h3>
            <Container fluid>
                <form onSubmit={handleSubmit}>
                    <input type='string'
                           name="username"
                           value={username}
                           onChange={_handleChangeEvent}
                           defaultValue="username"
                           aria-label={"Username"}
                    />
                    <input type="submit" value="Submit"/>
                </form>
                <hr></hr>
                &nbsp;

                <h3>Users List</h3>
                &nbsp;
                <Grid container spacing={3}>
                    {usersCardList}
                </Grid>
                {/*</div>*/}
            </Container>
        </div>
    );

}


function basicCard(user) {
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                    minWidth: 300,
                    maxWidth: 400
                }}
            >
                <Card variant="outlined">
                    <CardMedia
                        component="img"
                        sx={{
                            boxShadow: 1,
                            p: 1,
                            borderRadius: 50,
                            maxWidth: 80
                        }}
                        image={'https://i.pravatar.cc/48?u=' + getRandomInt(10000, 20000)}
                    />
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            {user.id}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {user.name}
                        </Typography>
                        <Typography variant="body2">
                            {user.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => removeUser(user.name)}>Delete</Button>
                    </CardActions>
                </Card>
            </Box>
        </ThemeProvider>
    );
}

// Declare the class methods and event handlers as regular functions
async function handleSubmit(event) {
    event.preventDefault();
    // console.log("State: " + this.state.username);
    console.log("Adding User: " + event.target.username.value);
    if (event.target.username.value == null || event.target.username.value === "") return;

    const id = crypto.randomUUID();
    const newFriend = {
        payload: event.target.username.value
    };

    await fetch('http://localhost:8088/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newFriend),
    }).then(() => {
        window.location.reload(false)
    });
}


async function removeUser(username) {
    console.log("Deleting" + username);
    const requestBody = {
        payload: username
    };
    const request = await fetch(`http://localhost:8088/users`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(() => {
        window.location.reload(false)
    });
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const theme = createTheme({
    palette: {
        background: {
            paper: '#fff',
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        }
    },
});

const UsersListEditConfig = {

    emptyLabel: 'UsersList',
    isEmpty: function (props) {
        return !props || !props.backend;
    }
};

export default function UsersList(props) {
    if (UsersListEditConfig.isEmpty(props)) {
        props.backend = 'http://localhost';
        props.backendPort = '8088';
    }

    return UsersListWrapper(props);
}

MapTo('amr-test-37/components/user-list')(UsersList, UsersListEditConfig);
