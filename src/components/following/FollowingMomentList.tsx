import InfiniteScroll from "react-infinite-scroll-component";
import useFollowingIds from "./hooks/useFollowingIds";
import useFollowingMoments from "./hooks/useFollowingMoments";
import MomentItem from "../home/MomentItem";
import Text from "../shared/Text";
import { css } from "@emotion/react";
import Flex from "../shared/Flex";

function FollowingMomentList({ userId }: { userId: string }) {
  const { followingIds } = useFollowingIds({ userId });
  const {
    data: moments = [],
    hasNextPage = false,
    loadMore = () => {},
  } = useFollowingMoments({ followingIds: followingIds ?? [] });

  return (
    <InfiniteScroll
      dataLength={moments?.length ?? 0}
      hasMore={hasNextPage}
      loader={<></>}
      next={loadMore}
      scrollThreshold="100px"
    >
      {followingIds?.length === 0 ? (
        <Flex justify="center" align="center" css={containerStyles}>
          <Text textAlign="center" typography="t5" color="gray400">
            팔로잉중인 유저가 없습니다.
          </Text>
        </Flex>
      ) : (
        <ul>
          {moments?.map((moment) => (
            <MomentItem moment={moment} key={moment.id} />
          ))}
        </ul>
      )}
    </InfiniteScroll>
  );
}
const containerStyles = css`
  height: 100%;
  padding: 12px 0px;
`;

export default FollowingMomentList;
