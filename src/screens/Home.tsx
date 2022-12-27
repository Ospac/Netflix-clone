import { useQuery } from "@tanstack/react-query"
import { fetchNowPlayingMovie, INowPlayingMovieResult } from "api"
import { motion, AnimatePresence} from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { makeImagePath } from "utils";

const sliderOffset = 6;
 
export default function Home (){
    //router
    const navigate = useNavigate();
    const movieInfoMatch = useMatch("/movies/:movieId");
    //state
    const {data : nowPlayingData, isLoading : nowPlayingLoading} = useQuery<INowPlayingMovieResult>(["movies", "nowPlaying"], fetchNowPlayingMovie);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    //click event
    const clickedMovie = movieInfoMatch?.params.movieId && nowPlayingData?.results.find(movie => String(movie.id) ===  movieInfoMatch.params.movieId);
    const toggleLeaving = () => setLeaving(prev => !prev);
    const onBoxClicked = (movieId : number) => navigate(`/movies/${movieId}`);
    const nextIndex = () => {
        if(leaving) return;
        toggleLeaving();
        if(nowPlayingData){
            const numOfMovies =nowPlayingData?.results.length - 1;
            const maxIndex = Math.floor(numOfMovies / sliderOffset) - 1;
            setSliderIndex((prev) => prev === maxIndex? 0 : prev + 1);
        }
    }
    const prevIndex = () => {
        if(leaving) return;
        toggleLeaving();
        setSliderIndex((prev) => prev === 0? 2 : prev - 1);
    }
    
    return <Wrapper>
        {nowPlayingLoading? (
        <Loader>Loading...</Loader>
        ) : 
        <>
            <Banner 
                onClick={nextIndex}
                bgPhoto={makeImagePath(nowPlayingData?.results[0].backdrop_path || "")}
            >
                <Title>{nowPlayingData?.results[0].title}</Title>
                <Overview>{nowPlayingData?.results[0].overview}</Overview>
            </Banner>
            <Slider>
                {
                // key가 변경되면 re-rendering -> animation(exit / initial / animate)
                }
                <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                    <Row variants={rowVariants} 
                    initial="hidden" 
                    animate="visible"
                    exit="exit"
                    key={sliderIndex}
                    transition={{type:"tween", duration: 1}}>
                        {nowPlayingData?.results.slice(1)
                        .slice(sliderOffset * sliderIndex, sliderOffset * sliderIndex + sliderOffset)
                        .map((movie, i) => (
                            <Box 
                                key={i}
                                layoutId={movie.id.toString()}
                                whileHover="hover"
                                initial="normal"
                                transition={{type: "tween"}}
                                variants={boxVariants}
                                onClick={()=> onBoxClicked(movie.id)}
                                bgPhotoPath={makeImagePath(movie.backdrop_path || movie.poster_path, "w500")}
                            >
                                <Info
                                    variants={infoVariants}
                                    transition={{delay: 0, duration: 0.4}}
                                >
                                    <h4>{movie.title}</h4>
                                </Info>
                            </Box>
                        ))}
                    </Row>
                </AnimatePresence>
            </Slider>
            
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
const Slider = styled.div`
    position: relative;
    top: -150px;
`
const Row = styled(motion.div)`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    margin-bottom: 30px;
    width: 100%;
    bottom: 0px;
`
const Box = styled(motion.div)<{bgPhotoPath: string}>`
    background-color: white;
    background-image: url(${(props) => props.bgPhotoPath});
    background-size: cover;
    background-position: center center;
    height: 150px;
    color: ${(props) => props.theme.white.lighter};
    cursor: pointer;
    font-size: 40px;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`
const Info = styled(motion.div)`
    position: relative;
    padding: 10px 0;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    width: 100%;
    top: 150px;
    h4{
        text-align: center;
        font-size: 13px;
    }
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
const infoVariants = { 
    hover: {
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 0.2,
            type: "tween"
        },
    },
}
const rowVariants = {
    hidden : {x : window.innerWidth + 10},
    visible : {x: 0},
    exit: { x: -window.innerWidth - 10}
}
const boxVariants = {
    normal : {
        scale : 1,
    },
    hover : {
        y: -50,
        scale: 1.5,
        transition: {
            delay: 0.25,
            duration: 0.25,
            type: "tween"
        }
    }
}