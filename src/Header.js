import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import Home from './Home'
import { AppProvider } from './AppContext'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function MovieTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const categories = ['popular', 'top_rated', 'now_playing']

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    return (
        <AppProvider value={categories[value]}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange}>
                        {
                            categories.map((item) => {
                                return <Tab label={item} />
                            })
                        }
                    </Tabs>
                </AppBar>
                <Home/>
            </div>
        </AppProvider>
    );
}
