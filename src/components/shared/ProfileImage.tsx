import useUser from "@/hooks/auth/useUser";
import { app, storage, store } from "@/remote/firebase";
import { userAtom } from "@store/atom/user";
import { colors } from "@styles/colorPalette";
import styled from "@emotion/styled";
import { getAuth, updateProfile } from "firebase/auth";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, updateDoc } from "firebase/firestore";
import { COLLECTIONS } from "@/constants/collections";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ProfileImage({
  size = 40,
  mode = "default",
  url,
}: {
  size?: number;
  mode?: "default" | "upload" | "moment";
  url?: string;
}) {
  const user = useUser();
  const setUser = useSetRecoilState(userAtom);
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const currentUser = getAuth(app).currentUser;

    if (files == null || user == null || currentUser == null) {
      return;
    }

    const storageRef = ref(storage, `users/${user.uid}/${user.displayName}`);
    const uploaded = await uploadBytes(storageRef, files[0]);
    const downloadUrl = await getDownloadURL(uploaded.ref);

    //1.fireAuth영역 업데이트
    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    });
    //2.store의 USER 컬렉션 업데이트
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    });
    setUser({
      ...user,
      photoURL: downloadUrl,
    });
  };
  return (
    <Container>
      <LazyLoadImage
        src={
          mode === "moment"
            ? url ||
              "https://cdn4.iconfinder.com/data/icons/coco-line/24/User-512.png"
            : user?.photoURL ||
              "https://cdn4.iconfinder.com/data/icons/coco-line/24/User-512.png"
        }
        width={size}
        height={size}
        alt="profile"
        effect="opacity"
      />
      {mode === "upload" ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: inline-block;

  & img {
    border-radius: 100%;
    border: 1px solid ${colors.gray200};
  }
  & input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;
export default ProfileImage;
