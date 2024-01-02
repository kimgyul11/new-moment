import styled from "@emotion/styled";
import Flex from "./Flex";
import Button from "./Button";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";

function FixedBottomBar() {
  return (
    <Container>
      <Flex css={ButtonGroupStyle} justify="space-between">
        <Button>글쓰기</Button>
        <Button>하이</Button>
        <Button>하이</Button>
        <Button>하이</Button>
      </Flex>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.white};
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px 10px;
`;

const ButtonGroupStyle = css`
  max-width: 480px;
  margin: auto;
  padding: 10px 24px;
`;

export default FixedBottomBar;
