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

export const shadow = (weight: number) => {
  const shadows = [
    css`
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    css`
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    `,
    css`
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    `,
  ];

  return shadows[weight];
};

export const mainGradient = css`
  background-image: linear-gradient(90deg, ${colors.firstColor}, ${colors.secondColor});
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
