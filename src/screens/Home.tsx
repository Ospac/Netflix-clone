import { useQuery } from "@tanstack/react-query"
import { fetchNowPlayingMovie, INowPlayingMovieResult } from "api"
import styled from "styled-components"
import { makeImagePath } from "utils";


export default function Home (){
    const {data : nowPlayingData, isLoading : nowPlayingLoading} 
    = useQuery<INowPlayingMovieResult>(["movies", "nowPlaying"], fetchNowPlayingMovie);
    return <Wrapper>
        {nowPlayingLoading? (
        <Loader>Loading...</Loader>
        ) : 
        <>
            <Banner bgPhoto={makeImagePath(nowPlayingData?.results[0].backdrop_path || "")}>
                <Title>{nowPlayingData?.results[0].title}</Title>
                <Overview>{nowPlayingData?.results[0].overview}</Overview>
            </Banner>
        </>}
    </Wrapper>
}
const Wrapper = styled.div`
    background: black;
`
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Banner = styled.div<{bgPhoto : string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)),url(${(props) => props.bgPhoto});
    background-size: cover;
`
const Title = styled.h2`
    font-size: 56px;
    margin-bottom: 10px;
`;
const Overview = styled.p`
    font-size: 20px;
    width: 50%;
`;