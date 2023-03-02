import React from 'react';
import styled, { css } from 'styled-components';
import { lighten, darken } from 'polished';
import { mainGradient } from '../../styles/styleUtil';

type ButtonProps = {
  children: React.ReactNode;
  width: number;
  onClick?: () => void;
};

const StyledButton = styled.button<ButtonProps>`
  ${(props) => {
    const WIDTH = props.width;
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
      padding: 1rem 2rem;
      width: ${WIDTH}px;
      height: auto;
      font-size: 1rem;
      /* 색상 */
      background-color: 'blue';
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
