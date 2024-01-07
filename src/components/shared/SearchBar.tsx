import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";

const SearchBar = styled.input`
  width: 100%;
  height: 44px;
  font-weight: 500;
  border: 1px solid ${colors.gray300};
  border-radius: 999px;
  padding: 0 16px;
  box-sizing: border-box;
  &::placeholder {
    color: ${colors.gray300};
  }
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
