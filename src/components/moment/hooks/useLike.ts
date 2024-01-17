import useUser from "@/hooks/auth/useUser";
import { addLike, getLike, removeLike } from "@/remote/like";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useLike({ momentId }: { momentId: string }) {
  const client = useQueryClient();
  const user = useUser();
  const { data: moment, isLoading } = useQuery(["likes", momentId], () =>
    getLike({ momentId })
  );

  //좋아요 추가
  const { mutate: like } = useMutation(
    ({ momentId, likeCount }: { momentId: string; likeCount: number }) =>
      addLike({ userId: user?.uid as string, momentId, likeCount }),
    {
      onMutate: async (data) => {
        await client.cancelQueries({ queryKey: ["likes", momentId] });
        const prevValue = client.getQueryData(["likes", momentId]);
        client.setQueryData(["likes", momentId], data);

        return { prevValue };
      },
      onSettled: () => {
        client.invalidateQueries(["likes", momentId]);
      },
      onError: (_, __, context) => {
        client.setQueryData(["likes", momentId], context?.prevValue);
      },
    }
  );

  //좋아요 취소
  const { mutate: unlike } = useMutation(
    ({ momentId, likeCount }: { momentId: string; likeCount: number }) =>
      removeLike({ userId: user?.uid as string, momentId, likeCount }),
    {
      onMutate: async (data) => {
        await client.cancelQueries({ queryKey: ["likes", momentId] });
        const prevValue = client.getQueryData(["likes", momentId]);
        client.setQueryData(["likes", momentId], data);
        return { prevValue };
      },
      onSuccess: () => {
        client.invalidateQueries(["likes", momentId]);
      },
      onError: (_, __, context) => {
        client.setQueryData(["likes", momentId], context?.prevValue);
      },
    }
  );

  return { like, unlike, moment, isLoading };
}

export default useLike;
