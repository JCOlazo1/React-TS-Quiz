import styled, { createGlobalStyle } from 'styled-components';
//@ts-ignore
import BGImage from './images/orang.jpg'

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100;
    }

    body {
        background-image: url(${BGImage});
        background-size: cover;
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }

    * {
        box-sizing: border-box;
        font-family: 'Oswald', sans-serif;
        font-size: 1.09rem;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: top;

    > p {
        color: #fff
    }

    .score {
        color: #ff9900;
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        font-family: Fascinate Inline, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        background-image: linear-gradient(180deg, #fff, #ff9933);
        background-size: 150%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 70px;
        margin: 1rem;
    }

    .start, .next {
        cursor: pointer;
        background: linear-gradient(180deg, #fff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0px 5px, 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40 px;
        margin: 20px 0;
        padding: 0 40px;
    }

    .start {
        max-width: 200px
        button-align: center;
    }
`;
