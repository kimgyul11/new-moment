import { css } from "@emotion/react";
import Flex from "./Flex";
import Text from "./Text";
import { Colors, colors } from "@/styles/colorPalette";

function IconButton({
  iconUrl,
  color = "gray400",
  text,
  onClick,
}: {
  iconUrl: string;
  text?: React.ReactNode;
  color?: Colors;
  onClick?: () => void;
}) {
  return (
    <Flex
      onClick={onClick}
      css={ButtonContainer}
      justify="center"
      align="center"
    >
      <img src={iconUrl} alt="" />
      <Text typography="t7" color={color}>
        {text}
      </Text>
    </Flex>
  );
}

const ButtonContainer = css`
  cursor: pointer;
  border: 1px solid ${colors.gray300};
  border-radius: 6px;
  height: 25px;
  width: 50px;

  img {
    margin-right: 5px;
    margin-bottom: 2px;
    width: 15px;
    height: 15px;
  }
`;

export default IconButton;
