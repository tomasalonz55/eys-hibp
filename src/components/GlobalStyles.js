import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Gotham';
        src: url('/fonts/Gotham.ttf');
    }
    *{
        margin: 0;
        padding:0;
        box-sizing: border-box;
    }
    *:focus {
    outline: none;
}
    html{
        &::-webkit-scrollbar{
            width: 0.5rem;
        }
        &::-webkit-scrollbar-thumb{
            background-color: darkgrey;
        }
        &::-webkit-scrollbar-track {
    background: white;
  }
    }
    body{
        font-family: 'Gotham', sans-serif;
        width: 100%;
    }
    h2{
        font-size: 3rem;
        font-family: 'Gotham', sans-serif;
        font-weight: lighter;
        color: #333;
    }
    h3{
        font-size: 1.3rem;
        color: #333;
        padding: 0.75rem 0rem;
    }
    p{
        font-size: 1.2rem;
        line-height: 200%;
        color: #696969;
    }
    a{
        text-decoration: none;
        color: #333;
    }
    img{
        display: block;
    }
`;

export default GlobalStyles;
