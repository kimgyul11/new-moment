import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";

const InputBox = styled.textarea<{ height?: string }>`
  width: 100%;
  box-sizing: border-box;
  font-weight: 500;
  font-size: 15px;
  padding: 16px;
  height: ${(props) => props.height || "80px"};
  resize: none;
  border: 1px solid ${colors.gray200};
  border-radius: 8px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${colors.gray300};
  }
`;

export default InputBox;
