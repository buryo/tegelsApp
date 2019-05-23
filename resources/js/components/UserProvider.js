import React, { Component } from 'react';
import { Spin } from "antd";

export const UserCredits = React.createContext();

class UserProvider extends Component {
    state = {
        user: null,
        loading: true
    }

    componentDidMount() {
        axios.get('/api/user/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then(response => {
                this.setState({
                    user: response.data,
                    loading: false
                });
            });
    }

    render() {
        if (this.state.loading) {
            return (
                null
                // Can put spinner here
            )
        } else {
            return (
                <UserCredits.Provider value={this.state.user}>
                    {this.props.children}
                </UserCredits.Provider>
            )
        }
    }
}

export default UserProvider;