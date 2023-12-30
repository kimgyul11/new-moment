import { colors } from "@/styles/colorPalette";
import styled from "@emotion/styled";
import Flex from "./Flex";
import { Link, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import Text from "./Text";
import useUser from "@/hooks/auth/useUser";
import { useCallback } from "react";
import Button from "./Button";

function Navbar() {
  const { pathname } = useLocation();
  const user = useUser();
  const showSignButton = ["/signup", "/signin"].includes(pathname) === false;

  const renderTitle = useCallback(() => {
    if (pathname === "/") {
      return <Text typography="t6">순간을 공유해보세요📸</Text>;
    }
    if (pathname === "/my") {
      return <Text bold={true}>마이 모멘트</Text>;
    }
    if (pathname === "/signin") {
      return <Text bold={true}>로그인</Text>;
    }
    if (pathname === "/signup") {
      return <Text bold={true}>회원가입</Text>;
    }
  }, [pathname]);

  const renderButton = useCallback(() => {
    if (user != null) {
      return (
        <Flex align="center">
          <Link to="/my">
            <img
              src={
                user.photoURL ??
                "https://cdn0.iconfinder.com/data/icons/phosphor-fill-vol-4/256/user-circle-fill-512.png"
              }
              alt={`${user.displayName}의 프로필`}
              width={40}
              height={40}
            />
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
  return (
    <Container>
      <Flex justify="space-between" align="center" css={navbarContainerStyles}>
        <Link to="/">HOME</Link>
        {renderTitle()}
        {renderButton()}
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
