import { Moment } from "@/models/moment";
import { removeMoment, updateMoment, writeMoment } from "@/remote/moment";
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
        createdAt: new Date(),
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

  //update
  const { mutate: update } = useMutation(
    ({
      momentObj,
      isNotUpdated,
    }: {
      momentObj: Pick<Moment, "text" | "image" | "hashTag" | "id" | "userId">;
      isNotUpdated: boolean;
    }) => updateMoment({ momentObj, isNotUpdated }),
    {
      onSuccess: (_, variables) => {
        client.invalidateQueries(["moment", variables.momentObj.id]);
      },
    }
  );

  return { write, writeIsLoading, remove, update };
}

export default useMoment;
