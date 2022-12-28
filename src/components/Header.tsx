import styled from "styled-components";
import profile from "src_assets/profile.png"
import { motion, useAnimation, useScroll, Variants } from 'framer-motion'
import { Link, useMatch, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Header () {
    const homeRouteMatch = useMatch("/");
    const tvRouteMatch = useMatch("/tv");
    const movieRouteMatch = useMatch("/movie");
    const moviesInfoMatch = useMatch("/movies/:movieId");
    const navigate = useNavigate();

    const { register, handleSubmit} = useForm<IForm>();
    const onValid = (data : IForm) => {
        navigate(`/search?keyword=${data.keyword}`);
    };
    const [isSearchOpen, setSearchOpen] = useState(false);
    const inputAnimation = useAnimation();
    const searchBtnAnimation = useAnimation();
    const navAnimation = useAnimation();
    const toggleSearchInput = () => {
        if(isSearchOpen){
            inputAnimation.start({ scaleX: 0 })
            searchBtnAnimation.start({ x : 0})
        }else{
            inputAnimation.start({ scaleX: 1 })
            searchBtnAnimation.start({ x : '-192px' })
        }
        setSearchOpen(prev => !prev)
    };
    const { scrollY } = useScroll()

    useEffect(() => {
        scrollY.onChange((lastestValue) => {
           if(lastestValue > 80) navAnimation.start({ backgroundColor : "black" });
           else navAnimation.start({ backgroundColor : "transparent" });
        });
    }, [scrollY, navAnimation])

    return (
    <Nav 
        animate={navAnimation}
    >
        <Col>
            <Link to=''>
                <Logo
                    width= '92'
                    height= '25'
                    viewBox = '0 0 1024 276.742'
                    variants = {logoVariants}
                    initial  = 'normal'
                    whileFocus = 'hover'
                    >
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor = '#f953c6' />
                            <stop offset="100%" stopColor = '#b91d73' />
                        </linearGradient>
                    </defs>
                    <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" fill='url(#grad1)'/>
                </Logo>
            </Link>
            <Items>
                <Item><Link to=''>홈</Link> {(homeRouteMatch || moviesInfoMatch) && <Circle layoutId="circle"/>}</Item>
                <Item><Link to='tv'>시리즈</Link>{tvRouteMatch && <Circle layoutId="circle"/>}</Item>
                <Item><Link to='movie'>영화</Link> {movieRouteMatch && <Circle layoutId="circle"/>}</Item>
            </Items>
        </Col>
        <Col>
            <Search onSubmit={handleSubmit(onValid)}>
                <SearchBtn 
                    onClick={toggleSearchInput}
                    animate={searchBtnAnimation}
                    transition={{ease: 'linear'}}   
                    >
                    <IoSearch/>
                </SearchBtn>
                <Input
                    {...register("keyword", { required: true, minLength: 2})}
                    initial={{scaleX : 0}}
                    animate={inputAnimation}
                    transition={{ease: 'linear'}} 
                    placeholder="제목, 장르"/>
            </Search>
            <Profile/>
        </Col>
    </Nav>)
}
interface IForm{
    keyword : string;
}
const logoVariants : Variants = {
    normal : {
        scale : 1
    },
    hover : {
        scale : 1.5,
    },

}
const inputVariants : Variants = {

}
const Nav = styled(motion.nav)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 68px;
    color: white;
    font-size: 14px;
    background-color: transparent;
    /* background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.1)); */
    background-image: linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent);

`;
const Logo = styled(motion.svg)`
`;
const Col = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 57px;
    gap: 10px;
`;
const Items = styled.ul `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 15px;
    align-items: center;
    list-style: none;
`;
const Item = styled.li `
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const Circle = styled(motion.span)`
    width: 6px;
    height: 6px;
    border-radius: 10px;
    background-color: white;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: -6px;
`;
const Search = styled.form`
    position: relative;
    display: flex;
    align-items: center;
`
const SearchBtn = styled(motion.button)`
    display: flex;
    align-items: center;
    color : white;
    font-size: 18px;
    z-index: 10;
    
`
const Input = styled(motion.input)`
    position: absolute;
    left: -195px;
    transform-origin: right center;
    background-color: transparent;
    color: white;
    padding: 10px 5px 10px 30px;
    font-size: 13px;
    border: solid 1px white;
`
const Profile = styled.img.attrs({
    src : `${profile}`
})`
    width: 32px;
    height: 32px;
    border-radius: 10px;
    padding-right: 15px;
`