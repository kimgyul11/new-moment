import { Colors, colors } from "@styles/colorPalette";
import styled from "@emotion/styled";

interface SpacingProps {
  size: number;
  direction?: "vertical" | "horizontal";
  backgroundColor?: Colors;
}
/** size : px단위 , direction : 기본값vertical */
const Spacing = styled.div<SpacingProps>`
  ${({ size, direction = "vertical" }) =>
    direction === "vertical"
      ? `
        height: ${size}px;
      `
      : `
        width: ${size}px;
      `}
  ${({ backgroundColor }) =>
    backgroundColor && `background-color:${colors[backgroundColor]}`}
`;

export default Spacing;
