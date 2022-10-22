const API_KEY = "a548c32f19e09973a6a42aa0319f0e9e";
const BASE_URL = "https://api.themoviedb.org/3/";
export const fetchNowPlayingMovie = () => {
    return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=ko&page=1`).then((res)=> res.json());
}
export const fetchImage = (path : string) => {
    return fetch(`${BASE_URL}t/p/original/${path}`).then((res)=>res.json());
}