import { Moment } from "@/models/moment";
import { removeMoment, writeMoment } from "@/remote/moment";
import { useMutation, useQueryClient } from "react-query";
import useUser from "@hooks/auth/useUser";

function useMoment() {
  const user = useUser();
  const client = useQueryClient();
  //create
  const { mutateAsync: write, isLoading: writeIsLoading } = useMutation(
    async ({
      text,
      image,
      hashTag,
    }: {
      text: string;
      image: string;
      hashTag?: string[];
    }) => {
      const newMoment = {
        createdAt: new Date().toString(),
        userId: user?.uid as string,
        text,
        image,
        hashTag,
      };
      await writeMoment(newMoment);
      return true;
    }
  );

  //delete
  const { mutate: remove } = useMutation(
    ({ userId, momentId }: { userId: string; momentId: string }) => {
      return removeMoment({ userId, momentId });
    },
    {
      onSuccess: () => {
        client.invalidateQueries(["moments"]);
      },
    }
  );

  //select Moment where(Like가 제일 많은 순)

  return { write, writeIsLoading, remove };
}

export default useMoment;
