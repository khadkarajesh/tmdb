import React, { useState,useEffect } from 'react'
const AuthContext = React.createContext()
const AuthConsumer = AuthContext.Consumer

function AuthProvider(props) {
    const [authenticated, setAuthenticated] = useState(window.localStorage.getItem('auth') || false)
    const [authBody, setAuthBody] = useState(window.localStorage.getItem('authBody') || null)

    useEffect(() => {
        window.localStorage.setItem('auth', authenticated)
        window.localStorage.setItem('authBody', authBody)
    }, [authenticated, authBody])

    const defaultContext = {
        authenticated,
        setAuthenticated,
        authBody,
        setAuthBody
    }

    return (
        <AuthContext.Provider value={defaultContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export  {AuthContext, AuthProvider , AuthConsumer}

