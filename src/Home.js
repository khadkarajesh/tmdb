import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile, Card } from '@material-ui/core'




import axios from 'axios'


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
    const classes = useStyles();
    axios
        .get('https://api.themoviedb.org/3/movie/popular?api_key=3d9f6ef05faa3072ee2caf7fb6870964&language=en-US&page=1')
        .then(function (response) {
            setMovies(response.data.results)
        })
        .catch(function (error) {
            console.log(error)
        })

    return (
        <div className={classes.root}>
            <GridList cellHeight={300} cols={5} className={classes.gridList} >
                {
                    movies.map((item) =>
                        <GridListTile key={item.title}>
                            <img src={`http://image.tmdb.org/t/p/w185/${item.poster_path}`} alt={item.title} />
                        </GridListTile>
                    )
                }
            </GridList>
        </div>
    );
}