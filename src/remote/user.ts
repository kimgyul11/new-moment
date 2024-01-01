import { doc, getDoc } from "firebase/firestore";
import { store } from "./firebase";
import { COLLECTIONS } from "@/constants/collections";

export async function getUser({ id }: { id: string }) {
  const snapshot = await getDoc(doc(store, COLLECTIONS.USER, id));
  console.log(snapshot.data());
  return {
    ...snapshot.data(),
  };
}
