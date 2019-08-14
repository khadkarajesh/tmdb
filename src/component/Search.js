import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles, fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import useDebounce from './useDebounce'
import { Link, withRouter } from 'react-router-dom'

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => { }, ref, ...other } = inputProps;

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <TextField
        color='inherit'
        InputProps={{
          disableUnderline: true,
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
        }}
        {...other}
      />
    </div>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.title, query);
  const parts = parse(suggestion.title, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }} >
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}


function getSuggestionValue(suggestion) {
  return suggestion.title;
}

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'flex',
    flexDirection: 'row'
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}));

 const Search = withRouter(({ history }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);
  const [stateSuggestions, setSuggestions] = React.useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMovies(debouncedSearchTerm)
    } else {
      setSuggestions([])
    }
  }, [debouncedSearchTerm])


  const handleSuggestionsFetchRequested = ({ value }) => {
  };

  const searchMovies = (searchTerm) => {
    axios.get(`https://api.themoviedb.org/3/search/multi?api_key=3d9f6ef05faa3072ee2caf7fb6870964&query=${searchTerm}`).then(response => {
      setSuggestions(response.data.results)
    })
  }

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = () => (event, { newValue }) => {
    setSearchTerm(newValue)
  };

  const onSuggestionSelected = (e, { suggestion}) => {
    history.push(`/movies/${suggestion.id}`)
  }

  const autosuggestProps = {
    renderInputComponent,
    onSuggestionSelected,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        placeholder: 'Search',
        value: searchTerm,
        onChange: handleChange(),
        inputRef: node => {
          setAnchorEl(node);
        },
        InputLabelProps: {
          shrink: true,
        },
      }}
      theme={{
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderSuggestionsContainer={options => (
        <Popper anchorEl={anchorEl} open={Boolean(options.children)} style={{ top: '10px' }}>
          <Paper
            square
            {...options.containerProps}
            style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}>
            {options.children}
          </Paper>
        </Popper>
      )}
    />
  );
})

export default Search