import InfiniteScroll from "react-infinite-scroll-component";
import useMoments from "./hooks/useMoments";
import MomentItem from "./MomentItem";

function MomentList() {
  const { data: moments, hasNextPage, loadMore } = useMoments();

  return (
    <InfiniteScroll
      dataLength={moments?.length ?? 0}
      hasMore={hasNextPage}
      loader={<></>}
      next={loadMore}
      scrollThreshold="100px"
    >
      <ul>
        {moments?.map((moment) => (
          <MomentItem moment={moment} key={moment.id} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}

export default MomentList;
