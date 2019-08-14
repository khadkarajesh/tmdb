import React, { useState, useContext } from 'react'
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import axios from 'axios'
import { AuthContext } from './AuthContext';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'primary',
        minHeight: '100vh',
        flexDirection: 'column'
    },
    loginContainer: {
        width: '30vh',
        height: '30vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10vh'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '45vh',
        height: '45vh'
    }
}));




export default (props) => {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { setAuthenticated, setAuthBody , createSession} = useContext(AuthContext)

    const setValue = (event) => {
        switch (event.target.id) {
            case 'email':
                event.preventDefault()
                setUsername(event.target.value)
                break;
            case 'password':
                setPassword(event.target.value)
                break;
            default:
                break;
        }
    }

    const validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const isValidEmail = () => {
        return username !== '' && validateEmail(username)
    }

    const getRequestId = async (event) => {
        event.preventDefault()
        try {
            let response = await axios.get('https://api.themoviedb.org/3/authentication/token/new?api_key=3d9f6ef05faa3072ee2caf7fb6870964')
            if (response.status === 200) {
                let session = await axios.post('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=3d9f6ef05faa3072ee2caf7fb6870964',
                    { username: username, password: password, request_token: response.data.request_token })
                setAuthenticated(true)
                setAuthBody(session.data)
                createSession(session.data.request_token)
                props.history.push('/movies')
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.loginContainer}>
                <form className={classes.form} onSubmit={getRequestId}>
                    <TextField
                        error={!isValidEmail(username)}
                        helpingText={!isValidEmail ? 'enter valid email' : ''}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        onChange={setValue}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        error={password === ''}
                        helpingText={password === '' ? 'enter valid password' : ''}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={setValue}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
              </Button>

                </form>
            </div>
        </div>
    );

}