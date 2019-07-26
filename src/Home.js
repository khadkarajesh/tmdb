import React, { useState, useEffect, Fragment } from 'react';
import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core'
import AppContext from './AppContext'
import axios from 'axios'
import AppConsumer from './AppContext'


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
}));
var page = 1

export default function Home() {
    const [isFetching, setIsFetching] = useState(false);


    const classes = useStyles();
    const [appState, setAppState] = useContext(AppContext)

    useEffect(() => {
        setIsFetching(true)
        fetchData()
    }, [appState.selected])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchData(page);
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }

    function getPageNumber() {
        if (appState.selected === 'popular') {
            return appState.popular.currentPage
        } else if (appState.selected === 'top_rated') {
            return appState.topRated.currentPage
        } else if (appState.selected === 'now_playing') {
            return appState.nowPlaying.currentPage
        }
    }

    function fetchData() {
        axios
            .get(`https://api.themoviedb.org/3/movie/${appState.selected}?api_key=3d9f6ef05faa3072ee2caf7fb6870964&language=en-US&page=${getPageNumber()}`)
            .then(response => {
                appState.changeState(appState.selected, response.data.results)
                setIsFetching(false)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <Fragment>
            <div className={classes.root}>
                <GridList cellHeight={300} cols={5} className={classes.gridList} >
                    {
                        appState.popular.movies.map((item) =>
                            <GridListTile key={item.id}>
                                <img src={`http://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} />
                            </GridListTile>
                        )
                    }
                </GridList>
                {isFetching && 'Fetching more list items...'}
            </div >
        </Fragment>
    );
}