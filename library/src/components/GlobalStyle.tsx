import { createGlobalStyle } from 'styled-components'
import theme from '../utils/theme'
import { mainFont, fontColor } from '../utils/vars'

const GlobalStyle = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap"),
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1rem;
    line-height: 2;
    font-family: ${mainFont};
    color: ${fontColor};
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`

export default GlobalStyle
