import React from 'react';

let adminRole = null;

axios.get('/api/user/', {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})
    .then(response => {
        adminRole = response.data.user_role
    });

const isAdmin = props => {
    return (
        <div>
            {
                adminRole !== 0 &&
                props.children
            }
        </div>
    );
}

export default isAdmin;