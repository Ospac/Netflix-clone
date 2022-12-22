const API_KEY = "a548c32f19e09973a6a42aa0319f0e9e";
const BASE_URL = "https://api.themoviedb.org/3/";
export interface IMovie{
    adult: boolean,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string
    original_title: string
    overview:string
    popularity: number,
    poster_path: string
    release_date: string
    title: string
    video: boolean,
    vote_average: number,
    vote_count: number,
}
export interface INowPlayingMovieResult{
    dates: {
        maximum : string,
        minimum : string,
    },
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
}
export const fetchNowPlayingMovie = () => {
    return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=ko&page=1`).then((res)=> res.json());
}
