import { css } from "@emotion/react";

import Button from "@shared/Button";
import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Spacing from "@shared/Spacing";
import { colors } from "@styles/colorPalette";
import { useQuery } from "react-query";
import { getUser } from "@/remote/user";
import ProfileImage from "../shared/ProfileImage";

function MomentItem({ moment }: any) {
  const { data: user } = useQuery(["user", moment.userId], () =>
    getUser({ id: moment.userId })
  );

  return (
    <li css={containerStyle}>
      {/* head */}
      <Flex justify="space-between">
        <Flex align="center">
          <ProfileImage mode="moment" />
          <Flex direction="column">
            <Text bold={true}>{moment.username}</Text>
            <Text typography="t7" color="gray400">
              20202000
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Button weak={true}>친구추가</Button>
        </Flex>
      </Flex>
      <Spacing size={8} />
      {/* contents */}
      <Flex direction="column" css={contentsWrap}>
        {moment.photo && (
          <>
            <Flex justify="center">
              <div css={photoWrap}>
                <img
                  src={moment.photo}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Flex>
          </>
        )}
        <Spacing size={16} />
        <Text typography="t6">{moment.text}</Text>
      </Flex>
      <Spacing size={8} />
      {/* footer */}
      <Flex justify="end">
        <Button.Group>
          <Button weak={true}>✅</Button>
          <Button>🎁</Button>
        </Button.Group>
      </Flex>
    </li>
  );
}

const containerStyle = css`
  padding: 8px 24px;
  border-bottom: 1px solid ${colors.gray200};
  margin: 16px 0px;
`;
const photoWrap = css`
  width: 100%;
  height: 300px;
  background-color: ${colors.gray50};
`;
const contentsWrap = css`
  min-height: 80px;
`;
export default MomentItem;
