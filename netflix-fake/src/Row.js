import instance from "./axios";
import { useState, useEffect } from "react";
import style from "./RowStyle.module.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

export const Row = ({ title, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results)
            //console.log(movies);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {

            autoplay: 1
        }
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.name || '')
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                }).catch(error => console.log(error))
        }
    }

    return (
        <div className={style.row}>
            <h2>{title}</h2>
            <div className={style.row__posters}>
                {movies.map((movie) => (
                    <img
                        className={isLargeRow ? style.rowPosterLarge : style.row__poster}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name} key={movie.id} onClick={() => handleClick(movie)} />
                        /*onClick={handleClick.bind(this, movie)} */
                ))}
            </div>
            {trailerUrl && < YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}