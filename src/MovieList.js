import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { from } from 'rxjs';


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
    const [isFetching, setIsFetching] = useState(false);
    const classes = useStyles();
    const [movies, setMovies] = useState([])

    useEffect(() => {
        setIsFetching(true)
        fetchData()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!isFetching) return;
        fetchData();
    }, [isFetching]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        setIsFetching(true);
    }


    function fetchData() {
        axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=3d9f6ef05faa3072ee2caf7fb6870964&language=en-US&page=1`)
            .then(response => {
                setMovies(response.data.results)
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
                        movies.map((item) =>
                            <Link to={`/movies/${item.id}`}>
                                <GridListTile key={item.id}>
                                    <img src={`http://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} />
                                </GridListTile>
                            </Link>
                        )
                    }
                </GridList>
                {isFetching && 'Fetching more list items...'}
            </div >
        </Fragment>
    );
}