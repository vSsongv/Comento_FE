import { theme } from "./../../../styles/theme";
import React from "react";
import styled, { css } from "styled-components";
import { lighten, darken } from "polished";

type ButtonProps = {
  children: React.ReactNode;
  color: string;
  backgroundColor: string;
  long: boolean;
  gradient: boolean;
  border: boolean;
};

Button.defaultProps = {
  color: "white",
  backgroundColor: "blue",
  long: false,
  gradient: true,
  border: false,
};

const StyledButton = styled.button<ButtonProps>`
  ${(props) => {
    const COLOR = props.color;
    const BACKGROUND_COLOR = props.backgroundColor;
    const LONG = props.long;
    const BORDER = props.border;
    const GRADIENT = props.gradient;
    return css`
      /* 공통 스타일 */
      display: inline-block;
      outline: none;
      border: none;
      border-radius: 25px;
      color: ${COLOR};
      font-weight: 700;
      cursor: pointer;
      text-align: center;
      ${BORDER &&
      css`
        border: 1px solid;
        border-color: ${COLOR};
      `}
      /* 크기 */
      padding: 1rem 2rem;
      ${LONG &&
      css`
        padding: 1rem 5rem;
      `}
      height: auto;
      font-size: 1rem;
      /* 색상 */
      background-color: ${BACKGROUND_COLOR};
      ${GRADIENT &&
      css`
        background-image: linear-gradient(
          90deg,
          ${theme.color.firstColor},
          ${theme.color.secondColor}
        );
      `}
      &:hover {
        color: ${lighten(0.1, COLOR)};
      }
      &:active {
        color: ${darken(0.1, COLOR)};
      }
    `;
  }}
`;

function Button({ children, ...rest }: ButtonProps) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
