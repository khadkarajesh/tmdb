import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext'
export default ({ component: Component, ...rest }) => {
    const {authenticated} = useContext(AuthContext)
    return (
        <Route
            {...rest}
            render={(props) =>
                authenticated === 'true' ?
                    <Component {...props}/>:
                    <Redirect to='/login' /> 
            }
        />
    );
};