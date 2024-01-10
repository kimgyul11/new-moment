import styled from "@emotion/styled";
import Flex from "./Flex";
import { css } from "@emotion/react";
import { colors } from "@/styles/colorPalette";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function FixedBottomBar() {
  const navigate = useNavigate();

  return (
    <Container
      initial={{ translateY: 100 }}
      animate={{ translateY: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Flex css={ButtonGroupStyle} justify="space-between" align="center">
        <img
          src="https://cdn3.iconfinder.com/data/icons/social-media-2125/70/follow-512.png"
          alt="친구의 게시물"
          onClick={() => navigate("/following")}
        />
        <img
          src="https://cdn3.iconfinder.com/data/icons/valenticons-2/64/valenticons-06-512.png"
          alt="좋아요한 게시물"
          onClick={() => navigate("/like")}
        />
        <img
          src="https://cdn3.iconfinder.com/data/icons/userinterface-1/100/ui-02-512.png"
          alt="알림"
          onClick={() => navigate("/notification")}
        />
        <img
          src="https://cdn3.iconfinder.com/data/icons/office-485/100/ICON_BASIC-15-512.png"
          alt="모멘트 작성하기"
          onClick={() => navigate("/write")}
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
