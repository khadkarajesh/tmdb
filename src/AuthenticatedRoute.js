import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext'
export default ({ components: Component, ...routeProps }) => {
    const { authenticated } = useContext(AuthContext)
    return (
        <Route
            {...routeProps}
            render={(props) => authenticated
                ? <Component {...props} />
                : <Redirect to="/login" />} />
    );
};