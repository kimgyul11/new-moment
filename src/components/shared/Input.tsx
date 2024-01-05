import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";

const Input = styled.input`
  padding: 0 16px;
  font-size: 15px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border: 1px solid ${colors.gray200};
  border-radius: 6px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  &[aria-invalid="true"] {
    border-color: ${colors.red};
  }
  &::placeholder {
    color: ${colors.gray300};
  }
`;

export default Input;
