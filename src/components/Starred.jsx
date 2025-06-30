import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from './Movie'
import '../styles/starred.scss'

const Starred = ({ viewTrailer }) => {

  const starredMovies = useSelector((state) => state.starred.starredMovies);
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useDispatch()

  const hasStarredMovies = starredMovies.length > 0;

  return (
    <div className="starred" data-testid="starred">
      {hasStarredMovies ? (<div data-testid="starred-movies" className="starred-movies">
        <h6 className="header">Starred movies</h6>
        <div className="movie-grid">
          {starredMovies.map((movie) => (
            <Movie
              movie={movie}
              key={movie.id}
              viewTrailer={viewTrailer}
            />
          ))}
        </div>

        <footer className="text-center">
          <button className="btn btn-primary" aria-label="Remove all starred movies"
            onClick={() => {
              if (window.confirm('Are you sure you want to remove all starred movies?')) {
                dispatch(clearAllStarred());
              }
            }}>Remove all starred</button>
        </footer>
      </div>) : (<div className="text-center empty-cart">
        <i className="bi bi-star" />
        <p>There are no starred movies.</p>
        <p>Go to <Link to='/'>Home</Link></p>
      </div>)}


    </div>
  )
}

export default Starred
