import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, ...rest, userRole }) => (
    <Route
        {...rest}
        render={props =>
            userRole ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to="/"
                    />
                )
        }
    />
);