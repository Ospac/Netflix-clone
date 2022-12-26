import { useQuery } from "@tanstack/react-query"
import { fetchNowPlayingMovie, INowPlayingMovieResult } from "api"
import { motion, AnimatePresence} from "framer-motion";
import { useState } from "react";
import styled from "styled-components"
import { makeImagePath } from "utils";

const sliderOffset = 6;
 
export default function Home (){
    const {data : nowPlayingData, isLoading : nowPlayingLoading} = useQuery<INowPlayingMovieResult>(["movies", "nowPlaying"], fetchNowPlayingMovie);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving(prev => !prev);
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
                                whileHover="hover"
                                initial="normal"
                                transition={{type: "tween"}}
                                variants={boxVariants}
                                bgPhotoPath={makeImagePath(movie.backdrop_path || movie.poster_path, "w500")}
                            />
                        ))}
                    </Row>
                </AnimatePresence>
            </Slider>
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
    margin-bottom: 10px;
    width: 100%;
`
const Box = styled(motion.div)<{bgPhotoPath: string}>`
    background-color: white;
    background-image: url(${(props) => props.bgPhotoPath});
    background-size: cover;
    background-position: center center;
    height: 200px;
    color: red;
    font-size: 40px;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`
const Info = styled(motion.div)`
    padding: 20px;
    background-color: ${(props) => props.theme.black.lighter};
`
const rowVariants = {
    hidden : {x : window.innerWidth },
    visible : {x: 0},
    exit: { x: -window.innerWidth}
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