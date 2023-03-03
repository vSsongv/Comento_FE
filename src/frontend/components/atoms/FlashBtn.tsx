import React from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

type FlashBtnProps = {
  children: React.ReactNode;
  width: number;
  borderRadius: number;
};

const StyledFlashBtn = styled.button<FlashBtnProps>`
  ${(props) => {
    const WIDTH = props.width;
    const BORDERRADIUS = props.borderRadius;
    return css`
      /* 공통 스타일 */
      display: inline-block;
      outline: none;
      border: 3.5px solid transparent;
      border-radius: ${BORDERRADIUS}px;
      background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, #033bff, #00e0ff);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #236AD6;
      font-weight: bold;
      font-family: 'NanumGothic';
      cursor: pointer;
      text-align: center;
      margin: auto;
      margin-top: 20px;
      /* 크기 */
      padding: 1rem auto;
      width: ${WIDTH}vw;
      height: 5vh;
      font-size: 1.4rem;
      /* 색상 */
      background-color: #FFFFFF;
      &:hover { color: ${lighten(0.1, 'blue')}; }
      &:active { color: ${darken(0.1, 'blue')}; }
    `;
  }}
`;

export default function FlashBtn({ children, ...rest }: FlashBtnProps) {
  return <StyledFlashBtn {...rest}>{children}</StyledFlashBtn>;
}
