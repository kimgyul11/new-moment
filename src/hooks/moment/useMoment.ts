import { Moment } from "@/models/moment";
import { writeMoment } from "@/remote/moment";
import { useMutation } from "react-query";
import useUser from "@hooks/auth/useUser";

function useMoment() {
  const user = useUser();
  const { mutateAsync: write } = useMutation(
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
  return { write };
}

export default useMoment;
