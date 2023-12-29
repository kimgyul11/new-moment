import { css } from "@emotion/react";

export const colorPalette = css`
  :root {
    /* gray */
    --gray: rgba(58, 58, 58, 1);
    --gray50: #f9fafb;
    --gray100: #f3f4f6;
    --gray200: #e5e7eb;
    --gray300: #d1d5db;
    --gray400: #9ca3af;
    --gray500: #6b7280;
    --gray600: #4b5563;
    --gray700: #374151;
    --gray800: #1f2937;
    --gray900: #111827;
    /* blue */
    --blue: #3b82f6;
    --blue60: #eff6ff;
    --blue100: #dbeafe;
    --blue500: #3b82f6;
    --blue980: #1d4ed8;
    /* red */
    --red: #ef4444;
    --red50: #fee2e2;
    --red100: #fca5a5;
    /* etc */
    --purple: #c084fc;
    --purple100: #ede9fe;
    --white: #fafafa;
    --white600: #525252;
    --white900: #171717;
    --black: #09090b;
    --teal: #5eead4;
  }
`;

export const colors = {
  gray: "var(--gray)",
  gray50: "var(--gray50)",
  gray100: "var(--gray100)",
  gray200: "var(--gray200)",
  gray300: "var(--gray300)",
  gray400: "var(--gray400)",
  gray500: "var(--gray500)",
  gray600: "var(--gray600)",
  gray700: "var(--gray700)",
  gray800: "var(--gray800)",
  gray900: "var(--gray900)",
  blue: "var(--blue)",
  blue60: "var(--blue60)",
  blue100: "var(--blue100)",
  blue500: "var(--blue500)",
  blue980: "var(--blue980)",
  red: "var(--red)",
  red50: "var(--red50)",
  red100: "var(--red100)",
  purple: "var(--purple)",
  purple100: "var(--purple100)",
  white: "var(--white)",
  white600: "var(--white600)",
  white900: "var(--white900)",
  black: "var(--black)",
  teal: "var(--teal)",
};

export type Colors = keyof typeof colors;
