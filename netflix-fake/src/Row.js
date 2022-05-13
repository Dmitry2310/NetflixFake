import instance from "./axios";
import { useState, useEffect } from "react";
import style from "./RowStyle.module.css";

const base_url = "https://image.tmdb.org/t/p/original/";

export const Row = ({ title, fetchUrl, isLargeRow }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results)
            //console.log(movies);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className={style.row}>
            <h2>{title}</h2>
            <div className={style.row__posters}>
                {movies.map((movie) => (
                    <img
                        className={isLargeRow ? style.rowPosterLarge : style.row__poster}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} key={movie.id} />
                ))}
            </div>
        </div>
    )
}