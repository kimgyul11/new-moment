import { getSearchMoment } from "@/remote/moment";
import { useInfiniteQuery, useQuery } from "react-query";

function useSearch(searchValue: string) {
  console.log(searchValue);
  const {
    data,
    isFetching,
    hasNextPage = false,
    fetchNextPage,
  } = useInfiniteQuery(
    ["searchTags", searchValue],
    ({ pageParam }) => getSearchMoment(searchValue, pageParam),
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

  const searchMoment = data?.pages.flatMap(({ items }) => items);
  return { data: searchMoment, loadMore, isFetching, hasNextPage };
}

export default useSearch;
