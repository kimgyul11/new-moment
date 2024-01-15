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
      css={ButtonContainer(colors[color])}
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

const ButtonContainer = (borderColor: string) => css`
  cursor: pointer;
  border: 1px solid ${borderColor};
  border-radius: 6px;
  height: 25px;
  min-width: 50px;
  padding: 2px 4px;

  img {
    margin-right: 5px;
    margin-bottom: 2px;
    width: 17px;
    height: 17px;
  }
`;

export default IconButton;
