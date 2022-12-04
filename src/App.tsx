import { ThemeProvider, createGlobalStyle } from "styled-components";
import Router from "./routes/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

const GlobalStyle = createGlobalStyle`
	@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
	}
	/* HTML5 display-role reset for older browsers */
	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section {
		display: block;
	}

	ol, ul {
		list-style: none;
	}
	blockquote, q {
		quotes: none;
	}
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	table {
		border-collapse: collapse;
		border-spacing: 0;
	}
	* {
  box-sizing: border-box;
}
html {
  font-size: 10px;
  font-family: 'Pretendard', sans-serif;
}
body{
	line-height: 1;
 	background-color: ${(props) => props.theme.color.bg.lv1};
 	color: ${(props) => props.theme.color.text.lv1}
}
a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  background-color: inherit;
  color:inherit;
}
img {
  width: 100%;
  height: auto;
}
input {
  &:focus {
    outline:none;
  }
}
.ir {
  position: absolute;
  clip: rect(0,0,0,0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow:hidden;
}
.hide {
  display: none;
}
`;


function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
