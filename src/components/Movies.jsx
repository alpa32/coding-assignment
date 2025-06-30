import Movie from './Movie'
import '../styles/movies.scss'
import { fetchMoreMovies } from '../data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from '../constants'
import useInfiniteScroll from "../hooks/useInfiniteScroll"

const Movies = ({ movies, viewTrailer, fetchStatus, currentPage, totalPages, searchQuery, dispatch }) => {

    useInfiniteScroll(() => {
        if (fetchStatus !== "loading" && currentPage < totalPages) {
            const nextPage = currentPage + 1;
            const url = searchQuery
                ? `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${nextPage}`
                : `${ENDPOINT_DISCOVER}&page=${nextPage}`;
            dispatch(fetchMoreMovies(url));
        }
    });

    return (
        <div className="movie-grid" data-testid="movies">
            {movies?.map((movie) => {
                return (
                    <Movie
                        movie={movie}
                        key={movie.id}
                        viewTrailer={viewTrailer}
                    />
                )
            })}
        </div>
    )
}

export default Movies
