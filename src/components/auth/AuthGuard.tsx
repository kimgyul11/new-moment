import { auth } from "@/remote/firebase";
import { userAtom } from "@/store/atom/user";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

function AuthGuard({ children }: { children: React.ReactNode }) {
  //초기화를 위한 상태
  const [initialize, setInitialize] = useState(false);

  //리코일에 로그인 상태를 담는다.
  const setUser = useSetRecoilState(userAtom);
  onAuthStateChanged(auth, (user) => {
    if (user == null) {
      setUser(null);
    } else {
      setUser({
        uid: user.uid,
        email: user.email ?? "",
        displayName: user.displayName ?? "",
        photoURL: user.photoURL ?? undefined,
      });
    }
    setInitialize(true);
  });

  if (initialize === false) {
    return null;
  }
  //유저 정보를 담고 화면을 그려준다.
  return <>{children}</>;
}

export default AuthGuard;
