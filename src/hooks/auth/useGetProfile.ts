import { getUser } from "@/remote/user";
import { useQuery } from "react-query";

export function useGetProfile({ userId }: { userId: string }) {
  return useQuery(["user", userId], () => getUser({ userId }));
}
