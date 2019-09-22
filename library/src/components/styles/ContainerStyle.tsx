import styled from "styled-components";
import { mainFont, fontColor } from "../../utils/vars";


const ContainerStyle = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap"),
  font-size: 1rem;
  line-height: 2;
  font-family: ${mainFont};
  color: ${fontColor};

  h1,h2,h3 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
  a {
    text-decoration: none;
    color: ${fontColor};
  }
`

export default ContainerStyle