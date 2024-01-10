import useUser from "@/hooks/auth/useUser";
import {
  cancleFollowing,
  followingAction,
  getFollowers,
} from "@/remote/following";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useFollow({ momentWriter }: { momentWriter: string }) {
  const client = useQueryClient();
  const user = useUser();
  //팔로우 조회
  const { data, isLoading } = useQuery(["follower", momentWriter], () =>
    getFollowers({ momentWriter })
  );
  const items = data
    ? data.users.map((user: any) => {
        return user.id;
      })
    : null;

  //팔로잉
  const { mutate: follow } = useMutation(
    ({ userId, followingId }: { userId: string; followingId: string }) =>
      followingAction({
        userId,
        followingId,
      }),
    {
      onSuccess: () => {
        client.invalidateQueries(["follower", momentWriter]);
        client.invalidateQueries(["followingIds", user?.uid]);
      },
    }
  );

  //팔로잉 취소
  const { mutate: unFollow } = useMutation(
    ({ userId, followingId }: { userId: string; followingId: string }) =>
      cancleFollowing({
        userId,
        followingId,
      }),
    {
      onSuccess: () => {
        client.invalidateQueries(["follower", momentWriter]);
        client.invalidateQueries(["followingIds", user?.uid]);
      },
    }
  );

  return { data: items, isLoading, follow, unFollow };
}

export default useFollow;
