import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
<<<<<<< HEAD
=======

* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	text-decoration: none;
}

>>>>>>> 15e4abebb09c12e850baa06177bfcbe653b0888f
	@font-face {
  font-family: logoFont;
  src: url('./assets/fonts/planetncond.ttf') format(truetype)
	}
	
	*{
		padding: 0;
    margin: 0;
    box-sizing: border-box;
		list-style-type:none;
	}

	:root{
		--dark-blue: #0870FF;
		--light-blue: #08AFFF;
		--neon-blue: #B7FFF7;
		--middle-blue: #08F6FF;
		--background: #FFFCF8;
		--card-background: #EAEFF5;
		--black: #1A2F25;
		--white: #fff;
	}
		
`;

export default GlobalStyle;
