import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import Flex from "./Flex";
import { Link, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import Text from "./Text";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <Container>
      <Flex justify="space-between" align="center" css={navbarContainerStyles}>
        <Link to="/">HOME</Link>
        <Text>{pathname}</Text>
        <Link to="/my">mypage</Link>
      </Flex>
    </Container>
  );
}
const Container = styled.nav`
  width: 100%;
  background-color: ${colors.white};
`;
const navbarContainerStyles = css`
  max-width: 768px;
  margin: auto;
  padding: 10px 24px;
  top: 0;
`;
export default Navbar;
