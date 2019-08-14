import React, { useState, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, CssBaseline, Toolbar } from '@material-ui/core';
import Search from './component/Search'
import MovieList from './MovieList'
import { AppContext } from './AppContext'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        overflowX: 'hidden'
    },
    appBar: {
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight:'64px'
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
        <Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar} >
                    <Toolbar>
                        <Tabs value={value} onChange={changeMenu}>
                            {
                                categories.map((item) => {
                                    return <Tab label={item.replace('_', ' ')} key={item} />
                                })
                            }
                        </Tabs>
                        <Search />
                    </Toolbar>
                </AppBar>
                <MovieList />
            </div>
        </Fragment>
    );
}
