import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './AuthContext'
export default ({ components: Component = null, render: Render = null, ...routeProps, }) => {
    const { authenticated } = useContext(AuthContext)

    return (
        <Route
            {...routeProps}
            render={props =>
                authenticated === 'true' ? (
                    Render ? (
                        Render(props)
                    ) : Component ? (
                        <Component {...props} />
                    ) : null
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    );
};