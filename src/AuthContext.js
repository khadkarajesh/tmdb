import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = React.createContext()
const AuthConsumer = AuthContext.Consumer

function AuthProvider(props) {
    const [authenticated, setAuthenticated] = useState(window.localStorage.getItem('auth') || false)
    const [authBody, setAuthBody] = useState(window.localStorage.getItem('authBody') || null)

    useEffect(() => {
        window.localStorage.setItem('auth', authenticated)
        window.localStorage.setItem('authBody', authBody)
    }, [authenticated, authBody])


    const createSession = (request_token) => {
        axios.post('https://api.themoviedb.org/3/authentication/session/new?api_key=3d9f6ef05faa3072ee2caf7fb6870964',
            { request_token: request_token }).then(response => {
                localStorage.setItem('session_id', response.data.session_id)
                getProfile(response.data.session_id)
            }).then(error => console.log(error))
    }

    const getProfile = (sessionId) => {
        axios.get(`https://api.themoviedb.org/3/account?api_key=3d9f6ef05faa3072ee2caf7fb6870964&session_id=${sessionId}`).then(response => {
            localStorage.setItem('avatar', response.data.avatar.gravatar.hash)
        }).then(error => console.log(error))
    }

    const defaultContext = {
        authenticated,
        setAuthenticated,
        authBody,
        setAuthBody,
        createSession
    }

    return (
        <AuthContext.Provider value={defaultContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider, AuthConsumer }

