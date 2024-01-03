import useUser from "@/hooks/auth/useUser";
import { getComments, writeComment } from "@/remote/comment";
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
      },
    }
  );

  return { data, isLoading, write };
}

export default useComments;
