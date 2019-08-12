import React, { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { Typography, Box, CssBaseline } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100vw',
        height: '100vh',
        overflowX:'hidden'
    },
    poster: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '16px'
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        color:'white'
    },
    container:{
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))`,
        width: '100vw',
        height: '100vh',
        overflowX:'hidden',
        display: 'flex',
        flexDirection: 'row',
        zIndex:'1',
        padding:'16px'
    }
}))

export default function MovieDetail({ match }) {
    const classes = useStyles()
    const [movieDetail, setMovieDetail] = useState({})
    const getMovieDetails = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=3d9f6ef05faa3072ee2caf7fb6870964&language=en-US`)
            .then(function (response) {
                setMovieDetail(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        getMovieDetails(match.params.id)
    }, [])

    return (
        <Fragment>
            <CssBaseline />
            <div className={classes.root} style={{
                backgroundImage: `url(http://image.tmdb.org/t/p/w1280/${movieDetail.backdrop_path})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className={classes.container}>
                    <div className={classes.poster}>
                        <img src={`http://image.tmdb.org/t/p/w185/${movieDetail.poster_path}`} alt={movieDetail.title} />
                        <Button variant="contained" color="primary" >Play Trailer</Button>
                    </div>
                    <div className={classes.info}>
                        <Box marginBottom={2}>
                            <Typography variant='h5' color='white'>{movieDetail.original_title}</Typography>
                        </Box>
                        <Box>
                            <Typography variant='body1'>{movieDetail.overview}</Typography>
                        </Box>
                    </div>
                </div>
            </div>
        </Fragment>)
}