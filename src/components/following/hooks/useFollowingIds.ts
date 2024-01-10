import { getFollowingIds } from "@/remote/following";
import { useQuery } from "react-query";

function useFollowingIds({ userId }: { userId: string }) {
  const { data: followingIds, isLoading } = useQuery(
    ["followingIds", userId],
    () => getFollowingIds({ userId })
  );
  return { followingIds, isLoading };
}

export default useFollowingIds;
