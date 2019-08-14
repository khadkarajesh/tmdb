import React, { useState, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, CssBaseline, Avatar } from '@material-ui/core';
import Search from './component/Search'
import MovieList from './MovieList'
import { AppContext } from './AppContext'
import DottedMenu from './component/DottedMenu'

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
        padding: '8px'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
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
                    <div style={{ display: 'flex' }}>
                        <Tabs value={value} onChange={changeMenu}>
                            {
                                categories.map((item) => {
                                    return <Tab label={item.replace('_', ' ')} key={item} />
                                })
                            }
                        </Tabs>
                        <div style={{ alignItems: 'center', position: 'relative', top: '6px' }}><Search /></div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar />
                        <DottedMenu />
                    </div>
                </AppBar>
                <MovieList />
            </div>
        </Fragment>
    );
}
