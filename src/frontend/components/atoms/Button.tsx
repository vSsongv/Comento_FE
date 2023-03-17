import React from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import { mainGradient } from '../../styles/styleUtil';

type ButtonProps = {
  children: React.ReactNode;
  width: number;
  height?: number;
  fontSize?: number;
  onClick?: () => void;
};

Button.defaultProps = {
  height: 50,
  fontSize: 17,
};

const StyledButton = styled.button<ButtonProps>`
  ${(props) => {
    const WIDTH = props.width;
    const HEIGHT = props.height;
    const FONT_SIZE = props.fontSize;
    return css`
      /* 공통 스타일 */
      display: inline-block;
      outline: none;
      border: none;
      border-radius: 25px;
      color: white;
      font-family: 'NanumGothic';
      text-align: center;
      margin: auto;
      margin-top: 20px;
      cursor: pointer;
      /* 크기 */
      width: ${WIDTH}px;
      height: ${HEIGHT}px;
      font-size: ${FONT_SIZE}px;
      /* 색상 */
      ${mainGradient}
      &:hover {
        color: ${lighten(0.1, 'white')};
      }
      &:active {
        color: ${darken(0.1, 'white')};
      }
    `;
  }}
`;

function Button({ children, onClick, ...rest }: ButtonProps) {
  return (
    <StyledButton {...rest} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default Button;
