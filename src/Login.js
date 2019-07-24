import React, { useState } from 'react'
import { TextField, Button , FormControlLabel, Checkbox} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

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




export default () => {
    const classes = useStyles()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


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

    return (
        <div className={classes.container}>
            <div className={classes.loginContainer}>
                <form className={classes.form}>
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