import { css } from "@emotion/react";

import Flex from "@shared/Flex";
import Text from "@shared/Text";
import Spacing from "@shared/Spacing";
import { colors } from "@styles/colorPalette";
import ProfileImage from "../shared/ProfileImage";
import { useGetProfile } from "@/hooks/auth/useGetProfile";

import { Link, useParams } from "react-router-dom";
import { Moment } from "@/models/moment";
import { Fragment } from "react";

import { getLikes } from "@/remote/like";
import { useQuery } from "react-query";
import ActionButton from "../moment/ActionButton";
import ListRow from "../shared/ListRow";

function MomentItem({ moment }: { moment: Moment }) {
  //여기서 momentId를 받고 이것을 통해서 Like와 Comment 컬렉션 가져오기
  const { data: likes } = useQuery(["likes", moment.id], () =>
    getLikes({ momentId: moment.id })
  );
  const { id } = useParams();
  console.log(id);

  //getComments, getLikes
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
              subTitle={moment.createdAt}
            />
          }
        />
        <p>친구추가</p>
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
    </li>
  );
}

const containerStyle = css`
  padding: 12px 12px;
  border-bottom: 12px solid ${colors.gray200};
  list-style: none;
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
`;
const footer = css``;
export default MomentItem;
