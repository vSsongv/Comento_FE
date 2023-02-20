import React from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

type FlashBtnProps = {
  children: React.ReactNode;
  color: string;
  border: string;
};

FlashBtn.defaultProps = {
  color: 'blue',
  long: false,
  border: true,
};

const StyledFlashBtn = styled.button<FlashBtnProps>`
  ${(props) => {
    const COLOR = props.color;
    const BORDER = props.border;
    return css`
      /* 공통 스타일 */
      display: inline-block;
      outline: none;
      border: none;
      color: white;
      font-weight: bold;
      font-family: 'NanumGothic';
      cursor: pointer;
      text-align: center;
      margin: auto;
      margin-top: 20px;
      /* 크기 */
      padding: 1rem auto;
      width: 6vw;
      height: 5vh;
      font-size: 1.4rem;
      /* 색상 */
      background-color: #FFFFFF;
      ${BORDER &&
      css`
        color: ${COLOR};
        background: none;
        border: 5px solid transparent;
        border-radius: 10px;
        background-image: linear-gradient(#fff, #fff), linear-gradient(90deg, #033bff, #00e0ff);
        background-origin: border-box;
        background-clip: content-box, border-box;
      `}
      &:hover { color: ${lighten(0.2, COLOR)}; }
      &:active { color: ${darken(0.2, COLOR)}; }
    `;
  }}
`;

export default function FlashBtn({ children, ...rest }: FlashBtnProps) {
  return <StyledFlashBtn {...rest}>{children}</StyledFlashBtn>;
}
