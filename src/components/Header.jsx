import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState } from 'react'

import '../styles/header.scss'

const Header = ({ onQueryChange }) => {

  const starredMovies = useSelector((state) => state.starred.starredMovies)
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onQueryChange(value)
  }

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => { onQueryChange(''); setQuery('') }}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          value={query}
          onChange={handleChange}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  )
}

export default Header
