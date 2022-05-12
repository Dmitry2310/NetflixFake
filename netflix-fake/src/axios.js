import axios from "axios";

/* base urlto make requests to the movie database */

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

export default instance;