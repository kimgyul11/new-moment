import { css } from "@emotion/react";

import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Spacing from "@shared/Spacing";
import { colors } from "@styles/colorPalette";
import ProfileImage from "@shared/ProfileImage";
import { useGetProfile } from "@/hooks/auth/useGetProfile";

import { Link } from "react-router-dom";
import { Moment } from "@/models/moment";
import { Fragment } from "react";

import ActionButton from "../moment/ActionButton";
import FollowingButton from "../moment/FollowingButton";
import ListRow from "@shared/ListRow";
import formatDate from "@/utils/formatTime";
import { LazyLoadImage } from "react-lazy-load-image-component";

function MomentItem({ moment }: { moment: Moment }) {
  const { data } = useGetProfile({ userId: moment.userId });

  return (
    <li css={containerStyle}>
      {/* head */}
      <Flex justify="space-between" align="center">
        <ListRow
          as="div"
          left={<ProfileImage mode="moment" url={data?.photoURL} />}
          contents={
            <ListRow.Texts
              title={data?.displayName}
              subTitle={formatDate(moment.createdAt)}
              typography="t6"
            />
          }
        />
        <FollowingButton momentWriter={moment.userId} />
      </Flex>

      <Spacing size={8} />
      {/* contents */}
      <Flex direction="column">
        <Link to={`/moments/${moment.id}`}>
          <Flex direction="column" css={contentsWrap}>
            {moment.image && (
              <Flex justify="center">
                <LazyLoadImage
                  src={moment.image}
                  css={photoWrap}
                  alt="momentImage"
                  effect="opacity"
                  height={350}
                />
                {/* <img src={moment.image} css={photoWrap} alt="momentImage" /> */}
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
                <Link to={`/search/${tag}`}>
                  <Text bold={true} typography="t7" color="blue">
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
      <ActionButton moment={moment} />
      <Spacing size={8} />
    </li>
  );
}

const containerStyle = css`
  padding: 6px 12px;
  border-bottom: 4px solid ${colors.gray200};
  list-style: none;
`;
const photoWrap = css`
  width: 100%;
  height: 350px;
  object-fit: contain;
  background-color: ${colors.gray200};
`;
const contentsWrap = css`
  min-height: 80px;
  cursor: pointer;
`;
export default MomentItem;
