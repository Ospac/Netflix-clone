import { IMovie } from "api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "utils";
interface IBox{
    movie : IMovie,
}
function Box ({movie} : IBox) {
    const navigate = useNavigate();
    const onBoxClicked = (movieId : number) => navigate(`/movies/${movieId}`);
    return <>
        <Wrapper 
        layoutId={movie.id.toString()}
        whileHover="hover"
        initial="normal"
        transition={{type: "tween"}}
        variants={boxVariants}
        onClick={()=> onBoxClicked(movie.id)}
        bgphotopath={makeImagePath(movie.backdrop_path || movie.poster_path, "w500")}
        >
            <Info
                variants={infoVariants}
                transition={{delay: 0, duration: 0.4}}
            ><h4>{movie.title}</h4>
            </Info>
        </Wrapper>
    </>
}
const Wrapper = styled(motion.div)<{bgphotopath: string}>`
    background-color: white;
    background-image: url(${(props) => props.bgphotopath});
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
export default Box;
