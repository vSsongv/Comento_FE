import { createGlobalStyle } from 'styled-components';
import BlackHanSans from '../assets/fonts/BlackHanSans.woff';

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
.App {
  background-color: #f4f4f4;
}
.page {
  margin-top: 55px;
  background-color: #f4f4f4;
}
.close {
  position: absolute;
  right: 0;
  top: 5px;
  width: 32px;
  height: 32px;
  opacity: 0.7;
}
.close:hover {
  opacity: 1;
}
.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 11px;
  width: 2px;
  background-color: gray;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
#root{
    margin:0 auto;
}
`;
