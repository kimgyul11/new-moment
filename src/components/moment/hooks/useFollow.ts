import {
  cancleFollowing,
  followingAction,
  getFollowers,
} from "@/remote/following";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useFollow({ momentWriter }: { momentWriter: string }) {
  const client = useQueryClient();

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
      },
    }
  );

  return { data: items, isLoading, follow, unFollow };
}

export default useFollow;
