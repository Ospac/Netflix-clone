import { INowPlayingMovieResult } from "api";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import Box from "./Box";


// key가 변경되면 re-rendering -> animation(exit / initial / animate)
const sliderOffset = 6;
function Slider ({moviesData} : ISlider){
    const [sliderIndex, setSliderIndex] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);
    const [isBack, setIsBack] = useState(false);
    const toggleLeaving = () => setIsLeaving(prev => !prev);
    const nextIndex = (back : boolean) => {
        if(isLeaving) return;
        toggleLeaving();
        if(moviesData){
            const numOfMovies = moviesData?.results.length - 1;
            const maxIndex = Math.floor(numOfMovies / sliderOffset) - 1;
            setIsBack(back);
            setIsBack(back);
            console.log(isBack);
            setSliderIndex((prev) => {
                return back?  (prev === 0? maxIndex : prev - 1) : (prev === maxIndex? 0 : prev + 1)
            });
        }
    }

    return <Wrapper>
    <AnimatePresence initial={false} onExitComplete={toggleLeaving} custom={isBack}>
        <Arrow style={{left: 0}} onClick={()=>nextIndex(true)}><IoIosArrowBack/></Arrow>
        <Row variants={rowVariants}
        custom={isBack} 
        initial="initial" 
        animate="visible"
        exit="exit"
        key={sliderIndex}
        transition={{type:"tween", duration: 1}}>
            {moviesData?.results.slice(1)
            .slice(sliderOffset * sliderIndex, sliderOffset * sliderIndex + sliderOffset)
            .map((movie, i) => (
                <Box movie={movie} key={i}/>
            ))}
        </Row>
        <Arrow style={{right: 0}} onClick={() => nextIndex(false)}><IoIosArrowForward /></Arrow>
    </AnimatePresence>
</Wrapper>
}
interface ISlider{
    moviesData : INowPlayingMovieResult | undefined;
}
const Wrapper = styled.div`
    position: relative;
    top: -150px;
    &:hover > span{
        opacity: 1;
    }
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
const Arrow = styled.span`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 30px;
    font-size: 35px;
    text-align: center;
    z-index: 99;
    opacity: 0;
    background-color: rgba(0,0,0, 0.3);
    height: 150px;
    width: 40px;
    cursor: pointer;
    &:hover{
        font-size: 45px;
        background-color: rgba(0,0,0, 0.7);
    }
`;
const rowVariants = {
    initial : (isBack : boolean) =>({x : (isBack? -window.innerWidth :  window.innerWidth)}),
    visible : {x: 0},
    exit: (isBack : boolean) =>({x : (isBack? window.innerWidth :  -window.innerWidth)}),
};

export default Slider;
