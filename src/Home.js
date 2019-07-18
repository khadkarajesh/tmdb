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

export default function Home() {
    const [movies, setMovies] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1)

    const classes = useStyles();
    const category = useContext(AppContext)

    useEffect(() => {
        setPage(1)
        setMovies([])
        fetchData(1)
    }, [category])

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

    function fetchData(pageNumber) {
        axios
            .get(`https://api.themoviedb.org/3/movie/${category}?api_key=3d9f6ef05faa3072ee2caf7fb6870964&language=en-US&page=${pageNumber}`)
            .then(response => {
                setPage(pageNumber + 1)
                setMovies([...movies, ...response.data.results])
                setIsFetching(false)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <AppConsumer>
            {({ value }) => (
                <Fragment>
                    <p>{value}</p>
                    <div className={classes.root}>
                        <GridList cellHeight={300} cols={5} className={classes.gridList} >
                            {

                                movies.map((item) =>
                                    <GridListTile key={item.id}>
                                        <img src={`http://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} />
                                    </GridListTile>
                                )
                            }
                            {
                                console.log(movies)
                            }
                        </GridList>
                        {isFetching && 'Fetching more list items...'}
                    </div >
                </Fragment>)
            }
        </AppConsumer>
    );
}