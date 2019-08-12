import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Typography, Box, CssBaseline } from '@material-ui/core';
import MovieList from './MovieList'
import { AppContext } from './AppContext'
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar:{
        maxWidth: '100vw',
        overflowX:'hidden'
    }
}));


export default function MovieTabs() {
    const classes = useStyles();
    const categories = ['popular', 'top_rated', 'now_playing']
    const [value, setValue] = useState(0)
    const { changeCategory } = useContext(AppContext)


    const changeMenu = (event, newValue) => {
        setValue(newValue)
        changeCategory(categories[newValue])
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar} >
                <Tabs value={value} onChange={changeMenu}>
                    {
                        categories.map((item) => {
                            return <Tab label={item} />
                        })
                    }
                </Tabs>
            </AppBar>
            <MovieList />
        </div>
    );
}
