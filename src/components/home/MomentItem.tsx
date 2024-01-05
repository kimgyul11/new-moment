import { css } from "@emotion/react";

import Button from "@shared/Button";
import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Spacing from "@shared/Spacing";
import { colors } from "@styles/colorPalette";
import ProfileImage from "../shared/ProfileImage";
import { useGetProfile } from "@/hooks/auth/useGetProfile";
import useUser from "@/hooks/auth/useUser";
import { Link } from "react-router-dom";
import { Moment } from "@/models/moment";
import { Fragment } from "react";

function MomentItem({ moment }: { moment: Moment }) {
  const user = useUser();
  const { data } = useGetProfile({ userId: moment.userId });
  // todo
  //1.유저 정보 가져와서 프로필 그리기
  //2.팔로우 정보 가져와서 체크
  //3.라이크 정보 가져와서 체크
  return (
    <li css={containerStyle}>
      {/* head */}
      <Flex justify="space-between">
        <Flex align="center">
          <ProfileImage mode="moment" url={data?.photoURL} />
          <Flex direction="column">
            <Text bold={true} typography="t6">
              {moment.userId}
            </Text>
            <Text typography="t7" color="gray400">
              20202000
            </Text>
          </Flex>
        </Flex>
        <Flex align="center">
          <div css={iconStyles}>
            <img src="https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/people-plus-add-friend-member-512.png" />
          </div>
        </Flex>
      </Flex>
      <Spacing size={8} />
      {/* contents */}
      <Flex direction="column">
        <Link to={`/moments/${moment.id}`}>
          <Flex direction="column" css={contentsWrap}>
            {moment.image && (
              <Flex justify="center">
                <img src={moment.image} css={photoWrap} />
              </Flex>
            )}
            <Spacing size={16} />
            <Text typography="t6">{moment.text}</Text>
          </Flex>
        </Link>
        <Spacing size={24} />

        {moment.hashTag && moment?.hashTag.length > 0 && (
          <Flex>
            {moment.hashTag.map((tag: string, idx: number) => (
              <Fragment key={idx}>
                <Link to={"/search"} state={{ tag }}>
                  <Text bold={true} typography="t7" color="gray500">
                    #{tag}
                  </Text>
                </Link>
                <Spacing direction="horizontal" size={6} />
              </Fragment>
            ))}
          </Flex>
        )}
      </Flex>
      <Spacing size={8} />
      {/* footer */}
      <Flex justify="end">
        {user?.uid === moment.userId && (
          <>
            <Button color="error">삭제</Button>
            <Button>수정</Button>
          </>
        )}
        <Button weak={true}>✅</Button>
        <Button>🎁</Button>
      </Flex>
    </li>
  );
}

const containerStyle = css`
  padding: 12px 12px;
  border-bottom: 12px solid ${colors.gray200};
`;
const photoWrap = css`
  width: 100%;
  height: 300px;
`;
const contentsWrap = css`
  min-height: 80px;
  cursor: pointer;
`;
const iconStyles = css`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
  }
`;
const footer = css``;
export default MomentItem;
