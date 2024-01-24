import React, {Component, useState} from 'react';
import {Button, ButtonGroup, Container, FormText, Table} from 'reactstrap';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, CardMedia, createTheme, ThemeProvider} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


function getRandomInt (min, max) {
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

class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [], username: String};
        this.handleSubmit = this.handleSubmit.bind(this);
        this._handleChangeEvent = this._handleChangeEvent.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then(data => this.setState({users: data}));
    }

    render() {
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const usersList = users.map(user => {
            return <tr key={user.id}>
                <td style={{whiteSpace: 'wrap'}}>{user.id}</td>
                <td >{user.name}</td>
                <td style={{whiteSpace: 'wrap',alignContent: "center"}}>{user.email}</td>
                <td style={{whiteSpace: 'wrap'}}>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.remove(user.name)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        })

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
                                sx = {{
                                    boxShadow: 1,
                                    p:1,
                                    borderRadius:50,
                                    maxWidth: 80
                                }}
                                image={'https://i.pravatar.cc/48?u='+getRandomInt(10000,20000)}
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

        // const usersCardList = users.map(user => basicCard(user))
        const usersCardList = users.map(user => basicCard(user))


        return (
            <div>
                <hr></hr>
                &nbsp;
                &nbsp;
                <h3>Add User</h3>
                <Container fluid>
                    <form onSubmit={this.handleSubmit}>
                        <input type='string'
                               value={this.state.username}
                               onChange={this._handleChangeEvent}
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

    _handleChangeEvent(event) {
            this.setState({username: event.target.value});
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log("State: "+this.state.username);
        if (this.state.username == null || this.state.username === "") return;

        const id = crypto.randomUUID();
        const newFriend = {
            payload: this.state.username
        };

        await fetch('http://localhost:8088/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFriend),
        }).then( () => {
            window.location.reload(false)
        });
    }
}



export default UsersList;

