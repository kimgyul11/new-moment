import useUser from "@/hooks/auth/useUser";
import { addLike, getLike, removeLike } from "@/remote/like";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useLike({ momentId }: { momentId: string }) {
  console.log(momentId);
  const client = useQueryClient();
  const user = useUser();
  const { data: moment, isLoading } = useQuery(["likes", momentId], () =>
    getLike({ momentId })
  );

  //좋아요
  const { mutate: like } = useMutation(
    ({ momentId, likeCount }: { momentId: string; likeCount: number }) =>
      addLike({ userId: user?.uid as string, momentId, likeCount }),
    {
      onSuccess: () => {
        client.invalidateQueries(["likes", momentId]);
      },
    }
  );

  //좋아요 취소
  const { mutate: unlike } = useMutation(
    ({ momentId, likeCount }: { momentId: string; likeCount: number }) =>
      removeLike({ userId: user?.uid as string, momentId, likeCount }),
    {
      onSuccess: () => {
        client.invalidateQueries(["likes", momentId]);
      },
    }
  );

  return { like, unlike, moment, isLoading };
}

export default useLike;
