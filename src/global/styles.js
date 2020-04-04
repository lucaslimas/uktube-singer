import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box !important;
    font-size: 12px;
    scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    scrollbar-width: thin;
    scroll-behavior: smooth;

    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: transparent;
      scrollbar-width: thin;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.3);
      /*border-radius: 5px;*/
    }
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #aaa;
    }
  }

  html, body, #root {
    min-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: #f7f7f7;
    box-sizing: border-box;
  }

  body, input, button {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen","Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    /* font-family: "72","72full",Arial,Helvetica,sans-serif;*/ 
  }

  button {
    cursor: pointer;
  }

  /* input {
    height: 30px;
    padding: 0 10px;  
    margin-bottom: 5px;
  } */

  a:link 
  { 
    text-decoration:none; 
  } 
`;
