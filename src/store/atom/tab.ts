import { atom } from "recoil";

export const tabAtom = atom<"all" | "friend" | "like">({
  key: "activeTab",
  default: "all",
});
