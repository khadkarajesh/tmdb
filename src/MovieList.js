import React, { useState, useEffect, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CssBaseline } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AppContext } from './AppContext';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: '1',
        marginTop:'16px'
    }
}));

export default function MovieList() {
    const [isFetching, setIsFetching] = useState(false);
    const classes = useStyles();
    const { movies, loading, loadMore } = useContext(AppContext)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
        loadMore()
    }


    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {movies.map(item => (
                            <Grid key={item} item>
                                <Link to={`/movies/${item.id}`}>
                                    <img src={`http://image.tmdb.org/t/p/w300/${item.poster_path}`} alt={item.title} />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {loading && 'Fetching more list items...'}
            </div>
        </Fragment>
    );
}