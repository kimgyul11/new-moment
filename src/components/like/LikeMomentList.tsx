import InfiniteScroll from "react-infinite-scroll-component";
import MomentItem from "../home/MomentItem";
import useLikeMoment from "./hooks/useLikeMoment";
import useUser from "@/hooks/auth/useUser";

function LikeMomentList({ userId }: { userId: string }) {
  const { data: moments, hasNextPage, loadMore } = useLikeMoment({ userId });

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

export default LikeMomentList;
