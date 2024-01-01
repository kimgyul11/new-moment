import { COLLECTIONS } from "@/constants/collections";
import { store } from "@/remote/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function useGetProfile({ id }: { id: string }) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.USER, id));
  return {
    id,
    ...snapshot.data(),
  };
}
