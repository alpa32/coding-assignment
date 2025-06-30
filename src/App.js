import { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Routes, Route, createSearchParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'
import { fetchMovies, resetMovies } from "./data/moviesSlice";

const App = () => {

  const { movies, currentPage, totalPages, fetchStatus , error} = useSelector((state) => state.movies);
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState(undefined)
  const [isOpen, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const closeModal = () => {
    setOpen(false);
    setVideoKey(null);
  };

  const getSearchResults = useCallback((query) => {
    dispatch(resetMovies());
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }, [dispatch,setSearchParams])

  const getMovies = useCallback(() => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }, [searchQuery, dispatch])

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    if (!videoKey) setOpen(true)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const url = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const results = data?.videos?.results ?? [];
      if (results.length > 0) {
        const trailer = results.find((vid) => vid.type === 'Trailer');
        setVideoKey(trailer ? trailer.key : results[0].key);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  }

  useEffect(() => {
    getMovies()
  }, [getMovies])

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() === "") {
        getSearchResults("")
      } else {
        getSearchResults(query)
      }
    }, 500)
  
    return () => clearTimeout(handler)
  }, [query, getSearchResults])



  return (
    <div className="App">
      <Header onQueryChange={setQuery} />

      <div className="container">
        <Routes>
          <Route path="/" element={<Movies movies={movies} viewTrailer={viewTrailer}
          fetchStatus={fetchStatus}
          currentPage={currentPage}
          totalPages={totalPages}
          searchQuery={searchQuery}
          dispatch={dispatch}
          />} 
          />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
        {fetchStatus === "loading" && (
          <div className="loader">Loading more movies...</div>
        )}
        {fetchStatus === 'error' && <p className="error">Error: {error}</p>}
      </div>
      {isOpen && videoKey && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>x</button>
            <YouTubePlayer videoKey={videoKey} />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
