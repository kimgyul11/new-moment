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
  max-width: 768px;
  margin: auto;
`;
export default Layout;
