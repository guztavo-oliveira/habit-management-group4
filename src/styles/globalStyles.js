import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

	@font-face {
  font-family: logoFont;
  src: url('./assets/fonts/planetncond.ttf') format(truetype);
  
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
		
	}`;

export default GlobalStyle;
