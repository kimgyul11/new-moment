import useUser from "@/hooks/auth/useUser";
import {
  removeComment,
  getComments,
  writeComment,
  updateComment,
} from "@/remote/comment";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useComments({ momentId }: { momentId: string }) {
  const client = useQueryClient();
  const user = useUser();
  //1.코멘트 데이터 가져오기
  const { data, isLoading } = useQuery(["comments", momentId], () =>
    getComments({ momentId })
  );

  //2.코멘트 작성하기
  const { mutateAsync: write } = useMutation(
    async (content: string) => {
      const newComment = {
        createdAt: new Date(),
        momentId,
        userId: user?.uid as string,
        content,
      };
      await writeComment(newComment);
      return true;
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["comments", momentId]);
        client.invalidateQueries(["moment", momentId]);
        client.invalidateQueries(["commentCount", momentId]);
      },
    }
  );

  //3.코멘트 삭제하기
  const { mutate: remove } = useMutation(
    ({ momentId, commentId }: { momentId: string; commentId: string }) => {
      return removeComment({ momentId, commentId });
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["comments", momentId]);
        client.invalidateQueries(["moment", momentId]);
        client.invalidateQueries(["commentCount", momentId]);
      },
    }
  );

  //4.코멘트 수정하기
  const { mutate: update } = useMutation(
    ({
      momentId,
      commentId,
      newComment,
    }: {
      momentId: string;
      commentId: string;
      newComment: string;
    }) => {
      return updateComment({ momentId, commentId, newComment });
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["comments", momentId]);
      },
    }
  );

  return { data, isLoading, write, remove, update };
}

export default useComments;
