import InfiniteScroll from "react-infinite-scroll-component";
import useFollowingIds from "./hooks/useFollowingIds";
import useFollowingMoments from "./hooks/useFollowingMoments";
import MomentItem from "../home/MomentItem";
import Text from "../shared/Text";

function FollowingMomentList({ userId }: { userId: string }) {
  const { followingIds } = useFollowingIds({ userId });
  const {
    data: moments = [],
    hasNextPage = false,
    loadMore = () => {},
  } = useFollowingMoments({ followingIds: followingIds ?? [""] });

  return (
    <InfiniteScroll
      dataLength={moments?.length ?? 0}
      hasMore={hasNextPage}
      loader={<></>}
      next={loadMore}
      scrollThreshold="100px"
    >
      {followingIds?.length === 0 ? (
        <Text>팔로잉중인 유저가 없습니다.</Text>
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

export default FollowingMomentList;
