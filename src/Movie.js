import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Home from './Home'
import { AppProvider } from './AppContext'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function MovieTabs() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [appState, setAppState] = useState({
        selected: 'popular',
        movies: [],
        popular: {
            currentPage: 1,
            movies: []
        },
        topRated: {
            currentPage: 1,
            movies: []
        },
        nowPlaying: {
            currentPage: 1,
            movies: []
        },
        changeState: (category,  movies) => {
            updateState(category, movies)
        }
    })

    const updateState = (category, movies) =>{
        switch (category) {
            case 'popular':
                setAppState({ ...appState, popular: { currentPage: appState.currentPage++, movies: movies } })
                //debugger
                break;
            case 'top_rated':
                setAppState({ ...appState, topRated: { currentPage: appState.currentPage++ , movies: movies } })
                break;
            case 'now_playing':
                setAppState({ ...appState, nowPlaying: { currentPage: appState.currentPage++, movies: movies } })
                break;
            default:
                break
        }
        //debugger
    }
    const categories = ['popular', 'top_rated', 'now_playing']

    function handleChange(event, newValue) {
        setValue(newValue);
        setAppState({ ...appState, selected: categories[newValue] })
    }


    return (
        <AppProvider value={[appState, setAppState]}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange}>
                        {
                            categories.map((item) => {
                                return <Tab label={item} />
                            })
                        }
                    </Tabs>
                </AppBar>
                <Home />
            </div>
            {appState && <p>{appState.selected}</p>}
        </AppProvider>
    );
}
