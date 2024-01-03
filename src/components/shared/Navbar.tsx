import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import Flex from "./Flex";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import Text from "./Text";
import useUser from "@/hooks/auth/useUser";
import { useCallback } from "react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";

function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useUser();
  const showSignButton = ["/signup", "/signin"].includes(pathname) === false;

  const renderTitle = useCallback(() => {
    if (pathname === "/my") {
      return <Text bold={true}>마이 모멘트</Text>;
    }
    if (pathname === "/signin") {
      return <Text bold={true}>로그인</Text>;
    }
    if (pathname === "/signup") {
      return <Text bold={true}>회원가입</Text>;
    }
    if (pathname === "/notification") {
      return <Text bold={true}>알림</Text>;
    }
  }, [pathname]);

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to="/my">
            <ProfileImage />
          </Link>
        </Flex>
      );
    }
    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      );
    }
  }, [user, showSignButton]);

  const renderLeft = useCallback(() => {
    if (pathname === "/") {
      return (
        <Link to="/">
          <p>LOGO</p>
        </Link>
      );
    } else {
      return (
        <img
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-left-512.png"
          width={30}
          height={30}
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        />
      );
    }
  }, [pathname]);

  return (
    <Container>
      <Flex justify="space-between" align="center" css={navbarContainerStyles}>
        {renderLeft()}
        {renderTitle()}
        {renderButton()}
      </Flex>
    </Container>
  );
}
const Container = styled.nav`
  width: 100%;
  background-color: ${colors.white};
  top: 0%;
  position: fixed;
  box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
  z-index: 10;
`;
const navbarContainerStyles = css`
  max-width: 480px;
  margin: auto;
  padding: 10px 24px;
  top: 0;
`;
export default Navbar;
