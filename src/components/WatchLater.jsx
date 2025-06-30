import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import watchLaterSlice from '../data/watchLaterSlice'
import Movie from './Movie'
import '../styles/starred.scss'

const WatchLater = ({ viewTrailer }) => {

  const watchLaterMovies = useSelector((state) => state.watchLater.watchLaterMovies);
  const { removeAllWatchLater } = watchLaterSlice.actions
  const dispatch = useDispatch()

  const hasMovies = watchLaterMovies.length > 0;

  return (
    <div className="starred" data-testid="watch-later-div">
      {hasMovies ? (<div data-testid="watch-later-movies" className="starred-movies">
        <h6 className="header">Watch Later List</h6>
        <div className="movie-grid">
          {watchLaterMovies.map((movie) => (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
            />
          ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" aria-label="Remove all movies saved to watch later"

            onClick={() => {
              if (window.confirm('Are you sure you want to remove all movies from Watch Later?')) {
                dispatch(removeAllWatchLater());
              }
            }}>Empty list</button>
        </footer>
      </div>) : (<div className="text-center empty-cart">
        <i className="bi bi-heart" />
        <p>You have no movies saved to watch later.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}


    </div>
  )
}

export default WatchLater
