import React, { useState, useEffect, useContext } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AppContext } from '../AppContext'


const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        alignContent: 'center',
        alignItems: 'center',
        color: 'inherit'
    }
}))


export default function MovieGenres() {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const { genres } = useContext(AppContext)


    const handleChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-simple" color='inherit'>Genres</InputLabel>
            <Select
                value={value}
                color='inherit'
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}>
                {
                    genres.map(genre => <MenuItem value={genre.name}>{genre.name}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}
