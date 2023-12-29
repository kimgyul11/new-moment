import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "./styles/colorPalette";
import { typographyMap } from "./styles/typography";

function App() {
  return (
    <div css={Container}>
      <h1>hello</h1>
      <Button>하이</Button>
    </div>
  );
}

const Container = css`
  background-color: ${colors.blue980};
  width: 100%;
  height: 100%;
  h1 {
    ${typographyMap.t1}
  }
`;

const Button = styled.button`
  width: 200px;
  height: 100px;
  ${typographyMap.t1}
`;

export default App;
