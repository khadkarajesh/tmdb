import React, { useState, useEffect, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CssBaseline} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AppContext } from './AppContext';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        maxWidth: '100vw',
        height: '100vh',
        overflowX:'hidden'
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
            <Grid item xs={12}>
                <Grid container justify="center" spacing='4'>
                    {movies.map(item => (
                        <Grid key={item} item>
                            <Link to={`/movies/${item.id}`}>
                                <img src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            {loading && 'Fetching more list items...'}
        </Fragment>
    );
}