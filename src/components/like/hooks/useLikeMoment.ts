import useUser from "@/hooks/auth/useUser";
import { getLikeMoments } from "@/remote/moment";
import { useInfiniteQuery } from "react-query";

function useLikeMoment({ userId }: { userId: string }) {
  const {
    data,
    isFetching,
    hasNextPage = false,
    fetchNextPage,
  } = useInfiniteQuery(
    ["likeMoments"],
    ({ pageParam }) => getLikeMoments(userId, pageParam),
    {
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible;
      },
    }
  );
  const loadMore = () => {
    if (hasNextPage === false || isFetching) {
      return;
    }
    fetchNextPage();
  };
  const moments = data?.pages.flatMap(({ items }) => items);

  return { data: moments, loadMore, isFetching, hasNextPage };
}

export default useLikeMoment;
