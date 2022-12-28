import { useQuery } from "@tanstack/react-query"
import { fetchNowPlayingMovie, INowPlayingMovieResult } from "api"
import Slider from "components/Slider";
import { motion, AnimatePresence} from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { makeImagePath } from "utils";
 
export default function Home (){
    //router
    const navigate = useNavigate();
    const movieInfoMatch = useMatch("/movies/:movieId");
    //state
    const {data : nowPlayingData, isLoading : nowPlayingLoading} = useQuery<INowPlayingMovieResult>(["movies", "nowPlaying"], fetchNowPlayingMovie);
    //click event
    const clickedMovie = movieInfoMatch?.params.movieId && nowPlayingData?.results.find(movie => String(movie.id) ===  movieInfoMatch.params.movieId);    
    
    return <Wrapper>
        {nowPlayingLoading? (
        <Loader>Loading...</Loader>
        ) : 
        <>
            <Banner 
                bgPhoto={makeImagePath(nowPlayingData?.results[0].backdrop_path || "")}
            >
                <Title>{nowPlayingData?.results[0].title}</Title>
                <Overview>{nowPlayingData?.results[0].overview}</Overview>
            </Banner>
            <Slider moviesData={nowPlayingData}/>
            <AnimatePresence>
                {movieInfoMatch?  <>
                    <Overlay 
                        onClick={() => navigate(-1)}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    />
                    <MovieDetail layoutId= {movieInfoMatch.params.movieId}>
                        {clickedMovie && <>
                            <DetailCover path={makeImagePath(clickedMovie.backdrop_path, "w500")}/>
                            <DetailTitle>{clickedMovie.title}</DetailTitle>
                            <OverView>{clickedMovie.overview}</OverView>
                        </>}
                    </MovieDetail>
                </> : null}
            </AnimatePresence>
        </>}
    </Wrapper>
}
const Wrapper = styled.div`
    background: black;
    overflow-x: hidden;
    overflow-y: hidden;
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
const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.5); 
    opacity: 0;
`
const MovieDetail = styled(motion.div)`
    position: fixed;
    width: 40vw;
    height: 70vh;
    background-color: ${(props) => props.theme.black.darker};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 15px;
    overflow: hidden;

`;
const DetailCover = styled(motion.div)<{path : string}>`
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center center;
    background-image: linear-gradient(to top, black, transparent), url(${(props) => props.path});

`
const DetailTitle = styled(motion.h3)`
    color: ${(props) => props.theme.white.lighter};
    text-align: center;
    padding: 10px;
    font-size: 20px;
    position: relative;
    top: -60px;
`;
const OverView = styled.p`
    padding: 20px;
    font-size: 13px;
    color: ${(props) => props.theme.white.lighter};
`