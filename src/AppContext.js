import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()
const AppConsumer = AppContext.Consumer

export default function AppProvider(props) {
    const [movies, setMovies] = useState([])
    let [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('popular')
    const [genres, setGenres] = useState([])

    useEffect(() => {
        fetchMovies(currentPage)
    }, [currentPage, category])

    useEffect(() => {
        fetchGenres()
    }, [])

    const fetchMovies = (page) => {
        setLoading(true)
        axios
            .get(`https://api.themoviedb.org/3/movie/${category}?api_key=3d9f6ef05faa3072ee2caf7fb6870964&language=en-US&page=${page}`)
            .then(response => {
                setMovies([...movies, ...response.data.results], () => {
                    console.log(movies)
                })
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    const fetchGenres = () => {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=3d9f6ef05faa3072ee2caf7fb6870964&language=en-US')
            .then(response => {
                setGenres(response.data.genres)
            })
            .catch(error => {

            })
    }

    const loadMore = () => {
        setCurrentPage(currentPage++)
    }

    const changeCategory = (category) => {
        console.log(category)
        setCurrentPage(1)
        setMovies([])
        setCategory(category)
    }

    let data = {
        fetchMovies,
        movies,
        loading,
        loadMore,
        changeCategory,
        genres
    }
    return (
        <AppContext.Provider value={data}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext, AppConsumer }