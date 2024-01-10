import { getFollowingMoments } from "@/remote/moment";
import { useInfiniteQuery } from "react-query";

function useFollowingMoments({ followingIds }: { followingIds: string[] }) {
  const {
    data,
    isFetching,
    hasNextPage = false,
    fetchNextPage,
  } = useInfiniteQuery(
    ["followingMoments"],
    ({ pageParam }) => getFollowingMoments(followingIds, pageParam),
    {
      getNextPageParam: (snapshot) => {
        return snapshot?.lastVisible;
      },
    }
  );

  const loadMore = () => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  };
  const moments = data && data?.pages.flatMap(({ items }) => items);

  if (followingIds.length === 0) {
    // 빈 배열이면 기본값으로 moments를 빈 배열로 설정
    return {
      data: [],
      loadMore: () => {},
      isFetching: false,
      hasNextPage: false,
    };
  }
  return { data: moments, loadMore, isFetching, hasNextPage };
}

export default useFollowingMoments;
