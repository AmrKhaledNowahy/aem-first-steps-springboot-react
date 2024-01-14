import React, {Component} from 'react';

export default class CrudComponent extends Component {
    state = {
        users: []
    };

    async componentDidMount() {
        const response = await fetch('http://localhost:8088/users');
        const body = await response.json();
        console.log(body);
        this.setState({users: body});
    }

    render() {
        const {users} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-intro">
                        <h3>users</h3>
                        {users.map(user =>
                            <div key={user}>
                                {user.id} {user.name} ({user.email})
                            </div>
                        )}
                    </div>
                </header>
            </div>
        );
    }
}