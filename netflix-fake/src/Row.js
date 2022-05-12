import instance from "./axios";
import { useState, useEffect } from "react";

export const Row = ({ title, fetchUrl }) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>{title}</h2>

        </div>
    )
}