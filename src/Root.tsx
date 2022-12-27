import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from 'components/Header';
import { createGlobalStyle } from 'styled-components';
const GlobalStyles = createGlobalStyle`
    a {color: #fff; text-decoration: none; outline: none}
    a:hover, a:active {text-decoration: none; color:#fff;}

    body {
    background-color: ${props => props.theme.black.darker};
    color: ${props => props.theme.white.darker};
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }
    h1,h2,h3,h4{
      margin: 0;
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
      <Header/>
      <Outlet/>
  </>
}

export default App;
