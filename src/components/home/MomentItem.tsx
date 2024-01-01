import { css } from "@emotion/react";

import Button from "@shared/Button";
import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Spacing from "@shared/Spacing";
import { colors } from "@styles/colorPalette";
import ProfileImage from "../shared/ProfileImage";
import { useGetProfile } from "@/hooks/auth/useGetProfile";
import useUser from "@/hooks/auth/useUser";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function MomentItem({ moment }: any) {
  const user = useUser();
  const { data } = useGetProfile({ userId: moment.userId });

  return (
    <li css={containerStyle}>
      {/* head */}
      <Flex justify="space-between">
        <Flex align="center">
          <ProfileImage mode="moment" url={data?.photoURL} />
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
      <Flex direction="column">
        <Link to={`/moments/${moment.id}`}>
          <Flex direction="column" css={contentsWrap}>
            {moment.photo && (
              <Flex justify="center" css={photoWrap}>
                <img
                  src={moment.photo}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "contain",
                  }}
                />
              </Flex>
            )}
            <Spacing size={16} />
            <Text typography="t6">{moment.text}</Text>
          </Flex>
        </Link>
        <Spacing size={16} />

        {moment?.hashTag.length > 0 && (
          <Flex>
            {moment?.hashTag.map((tag: string, idx: number) => (
              <Fragment key={idx}>
                <Text bold={true} typography="t7" color="gray500">
                  #{tag}
                </Text>
                <Spacing direction="horizontal" size={8} />
              </Fragment>
            ))}
          </Flex>
        )}
      </Flex>
      <Spacing size={8} />
      {/* footer */}
      <Flex justify="end">
        <Button.Group>
          {user?.uid === moment.userId && (
            <>
              <Button color="error">삭제</Button>
              <Button>수정</Button>
            </>
          )}
          <Button weak={true}>✅</Button>
          <Button>🎁</Button>
        </Button.Group>
      </Flex>
    </li>
  );
}

const containerStyle = css`
  padding: 12px 0px;
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
