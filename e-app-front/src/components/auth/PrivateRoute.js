import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({ Component: Component, ...rest }) => {
    return <Route
        {...rest}
        render={props =>
            isAuthenticated() && !isAuthenticated().user.isAdmin ?
                (<Component{...props} />) : (<Redirect to={{
                    pathname: "/signin",
                    state: { from: props.location }
                }}
                />
                )} />
};

export default PrivateRoute;
