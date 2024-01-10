import useUser from "@/hooks/auth/useUser";
import { getFollowingIds } from "@/remote/following";
import { useQuery } from "react-query";

function useFollowing() {
  const user = useUser();
  const { data: followingIds, isLoading } = useQuery(
    ["following", user?.uid],
    () => getFollowingIds({ userId: user?.uid })
  );
  return { followingIds, isLoading };
}

export default useFollowing;
