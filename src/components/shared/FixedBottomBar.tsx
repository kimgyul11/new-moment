import styled from "@emotion/styled";
import Flex from "./Flex";
import Button from "./Button";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";
import { motion } from "framer-motion";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

function FixedBottomBar() {
  const navigate = useNavigate();
  type CustomMouseEvent = MouseEvent<HTMLImageElement>;
  const handleOnClick = (e: CustomMouseEvent) => {
    const target = e.target as HTMLImageElement;
    if (target.id === "write") {
      navigate("/write");
    }
    if (target.id === "notification") {
      navigate("/notification");
    }
  };
  return (
    <Container
      initial={{ translateY: 100 }}
      animate={{ translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Flex css={ButtonGroupStyle} justify="space-between" align="center">
        <img
          id="target"
          src="https://cdn3.iconfinder.com/data/icons/social-media-2125/70/follow-512.png"
          alt="친구의 게시물"
          onClick={handleOnClick}
        />
        <img
          src="https://cdn3.iconfinder.com/data/icons/valenticons-2/64/valenticons-06-512.png"
          alt="좋아요한 게시물"
          onClick={handleOnClick}
        />
        <img
          id="notification"
          src="https://cdn3.iconfinder.com/data/icons/userinterface-1/100/ui-02-512.png"
          alt="알림"
          onClick={handleOnClick}
        />
        <img
          id="write"
          src="https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-15-512.png"
          alt="모멘트 작성하기"
          onClick={handleOnClick}
        />
      </Flex>
    </Container>
  );
}

const Container = styled(motion.div)`
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
  img {
    width: 30px;
    height: 30px;
    &:hover {
      cursor: pointer;
    }
  }
`;

export default FixedBottomBar;
