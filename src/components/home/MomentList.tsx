import InfiniteScroll from "react-infinite-scroll-component";
import useMoments from "./hooks/useMoments";
import MomentItem from "./MomentItem";

function MomentList() {
  //리코일로 상태를 관리

  //default
  const { data: moments, hasNextPage, loadMore } = useMoments();

  //만약 좋아요라면?

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
