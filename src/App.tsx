import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from 'routes/Home';
import Tv from 'routes/Tv';
import Search from 'routes/Search';
import Header from 'components/Header';
import { createGlobalStyle } from 'styled-components';
import Movie from 'routes/Movie';
const GlobalStyles = createGlobalStyle`
    a {color: #fff; text-decoration: none; outline: none}
    a:hover, a:active {text-decoration: none; color:#fff;}
    body {
        background-color: white;
    }
    button {
      background : none;
      border : 0;
    }
    input{
      &:focus{
        outline: 0;
      }
    }

`;
function App() {
  return <>
    <GlobalStyles/>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/tv" element={<Tv/>}></Route>
        <Route path="/movie" element={<Movie/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
