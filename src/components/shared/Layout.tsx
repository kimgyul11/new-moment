import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  max-width: 480px;
  margin: auto;

  background-color: ${colors.white};
`;
export default Layout;
