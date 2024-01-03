import styled from "@emotion/styled";

const InputBox = styled.textarea`
  width: 90%;
  padding: 16px;
  height: 80px;
  resize: none;
  border: none;
  border-radius: 8px;
  &:focus {
    outline: none;
  }
`;

export default InputBox;
