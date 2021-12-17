import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
	padding: 0;
	margin: 0;
	box-sizing: border-box;
	text-decoration: none;
}
	
	*{
		padding: 0;
    margin: 0;
    box-sizing: border-box;
		list-style-type:none;
	}

	:root{
		--black: #1A2F25;
		--gray:#717976;
		--red: #e83f5b;
		--red-strong: red;	
		--green: #4bbb97;
		--dark-blue: #0870FF;
		--light-blue: #08AFFF;
		--middle-blue: #08F6FF;
		--neon-blue: #B7FFF7;
		--card-background: #EAEFF5;
		--background: #FFFCF8;
		--white: #fff;
	}
		
`;

export default GlobalStyle;
