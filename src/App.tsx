import { css } from "@emotion/react";
import styled from "@emotion/styled";

function App() {
  return (
    <div css={Container}>
      <h1>hello</h1>
      <Button>하이</Button>
    </div>
  );
}

const Container = css`
  background-color: red;
  width: 100%;
  height: 100%;
`;

const Button = styled.button`
  width: 200px;
  height: 100px;
`;

export default App;
