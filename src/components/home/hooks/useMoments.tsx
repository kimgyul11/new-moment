import { getMoment, getMoments } from "@/remote/moment";
import { useInfiniteQuery } from "react-query";

function useMoments() {
  //mode = all , like , follow
  //default = all
  //if(mode === all){ getMoments }
  //if(mode === like){ getLikeMoments }
  //if(mode === follow){ getfollowMoments}

  const {
    data,
    isFetching,
    hasNextPage = false,
    fetchNextPage,
  } = useInfiniteQuery(["moments"], ({ pageParam }) => getMoments(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible;
    },
  });

  //다음 페이지를 불러오는 함수
  const loadMore = () => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  };
  const moments = data?.pages.flatMap(({ items }) => items);

  return { data: moments, loadMore, isFetching, hasNextPage };
}

export default useMoments;
