import { doc, getDoc } from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants/collections";
import { User } from "@/models/user";

export async function getUser({ userId }: { userId: string }) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.USER, userId));
  return {
    ...snapshot.data(),
  } as User;
}
