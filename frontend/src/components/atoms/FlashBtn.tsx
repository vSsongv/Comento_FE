import React from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';

type FlashBtnProps = {
  children: React.ReactNode;
  width: number;
  height?: number;
  fontSize?: number;
  onClick?: () => void;
};

FlashBtn.defaultProps = {
  height: 50,
  fontSize: 17,
};

const StyledFlashBtn = styled.button<FlashBtnProps>`
  ${(props) => {
    const WIDTH = props.width;
    const HEIGHT = props.height;
    const FONT_SIZE = props.fontSize;
    return css`
      /* 공통 스타일 */
      display: inline-block;
      outline: none;
      border: 1.5px solid transparent;
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
      /* padding: 1rem auto; */
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      font-size: ${FONT_SIZE}px;
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

export default function FlashBtn({ children, onClick, ...rest }: FlashBtnProps) {
  return (
    <StyledFlashBtn {...rest} onClick={onClick}>
      {children}
    </StyledFlashBtn>
  );
}
