import { createGlobalStyle } from "styled-components";
import BlackHanSans from "../assets/fonts/BlackHanSans.woff";

export default createGlobalStyle`
@font-face {
  font-family: "BHS";
  src: local("BHS"), url(${BlackHanSans}) format('woff');
}
*{
  @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'NanumGothic';
}
#root{
    margin:0 auto;
}
`;
