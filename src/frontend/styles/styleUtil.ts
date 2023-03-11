import colors from './colors';
import { css } from 'styled-components';

type sizes = {
  wide: string;
  desktop: string;
  tablet: string;
  phone: string;
};

export const sizes: sizes = {
  wide: '1200px',
  desktop: '992px',
  tablet: '768px',
  phone: '376px',
};

export const boxShadow = '5px 5px 10px #b8b8b8';

export const mainGradient = css`
  background-image: linear-gradient(90deg, ${colors.firstColor}, ${colors.primaryColor}, ${colors.secondColor});
`;

export const border = (position: number) => {
  const borders = [
    css`
      border-top: solid 0.7px rgba(168, 168, 168, 1);
    `,
    css`
      border-right: solid 0.7px rgba(168, 168, 168, 1);
    `,
    css`
      border-bottom: solid 0.7px rgba(168, 168, 168, 1);
    `,
    css`
      border-left: solid 0.7px rgba(168, 168, 168, 1);
    `,
  ];

  return borders[position];
};
