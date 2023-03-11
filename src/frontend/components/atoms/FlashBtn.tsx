import React from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

type FlashBtnProps = {
  children: React.ReactNode;
  width: number;
};

const StyledFlashBtn = styled.button<FlashBtnProps>`
  ${(props) => {
    const WIDTH = props.width;
    return css`
      /* 공통 스타일 */
      display: inline-block;
      outline: none;
      border: 3.5px solid transparent;
      border-radius: 10px;
      background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, #033bff, #00e0ff);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #236ad6;
      font-weight: 700;
      font-family: 'NanumGothic';
      cursor: pointer;
      text-align: center;
      /* 크기 */
      padding: 1rem auto;
      width: ${WIDTH}px;
      height: 30px;
      font-size: 15px;
      /* 색상 */
      background-color: #ffffff;
      &:hover {
        color: ${lighten(0.1, 'blue')};
      }
      &:active {
        color: ${darken(0.1, 'blue')};
      }
    `;
  }}
`;

export default function FlashBtn({ children, ...rest }: FlashBtnProps) {
  return <StyledFlashBtn {...rest}>{children}</StyledFlashBtn>;
}
