import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import { InputBase } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'
import useDebounce from './useDebounce'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        display: 'flex',
        flexDirection: 'row'
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    searchContainer: {
        display: 'flex',
    }
}))


export default function Search() {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const classes = useStyles()

    const searchMovies = (searchTerm) => {
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=3d9f6ef05faa3072ee2caf7fb6870964&query=${searchTerm}`).then(response => {
            setResults(response.data.results)
            setIsSearching(false)
        }).then(error => {
            setIsSearching(false)
        })
    }


    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true)
            searchMovies(debouncedSearchTerm)
        } else {
            setResults([])
        }
    }, [debouncedSearchTerm])
    return (
        <div className={classes.searchContainer}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    color='inherit'
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {isSearching && <div>Searching....</div>}
            {results.map(result => (
                <div key={result.id}>
                    <h4>{result.title}</h4>
                </div>
            ))}
        </div>
    )
}
