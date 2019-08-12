import React, {useEffect, Fragment, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {AppContext} from './AppContext';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function MovieList() {
    const classes = useStyles();
    const {movies, loading, loadMore} = useContext(AppContext)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
        loadMore()
    }

    return (
        <Fragment>
            <div className={classes.root}>
                <GridList cellHeight={300} cols={5} className={classes.gridList} >
                    {
                        movies.map((item) =>
                            <Link to={`/movies/${item.id}`}>
                                <GridListTile key={item.id}>
                                    <img src={`http://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.title} />
                                </GridListTile>
                            </Link>
                        )
                    }
                </GridList>
                {loading && 'Fetching more list items...'}
            </div >
        </Fragment>
    );
}