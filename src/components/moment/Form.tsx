import { css } from "@emotion/react";
import Button from "@shared/Button";
import Flex from "@shared/Flex";
import InputBox from "@shared/InputBox";
import { colors } from "@/styles/colorPalette";
import Spacing from "../shared/Spacing";
import { useState } from "react";

function Form() {
  //버튼 클릭 시 댓글이 작성된다.
  useState();

  return (
    <Flex justify="center" css={commentContainer} direction="column">
      <InputBox />
      <Spacing size={12} />
      <Button>작성</Button>
    </Flex>
  );
}
const commentContainer = css`
  border: 1px solid ${colors.gray300};
  padding: 8px;
  border-radius: 8px;
`;
export default Form;
