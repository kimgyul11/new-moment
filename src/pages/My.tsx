import Button from "@/components/shared/Button";
import Flex from "@/components/shared/Flex";
import Input from "@/components/shared/Input";
import ProfileImage from "@/components/shared/ProfileImage";
import Spacing from "@/components/shared/Spacing";
import Text from "@/components/shared/Text";
import Top from "@/components/shared/Top";
import { COLLECTIONS } from "@/constants/collections";
import useUser from "@/hooks/auth/useUser";
import { User } from "@/models/user";
import { app, auth, store } from "@/remote/firebase";
import { userAtom } from "@/store/atom/user";
import { css } from "@emotion/react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";

function MyPage() {
  const user = useUser();
  const [displayName, setDisplayName] = useState(user?.displayName);
  const setUser = useSetRecoilState(userAtom);
  const currentUser = getAuth(app).currentUser;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };
  const handleChangeDisplayName = async () => {
    if (!currentUser) {
      return;
    }
    if (!displayName) {
      return;
    }
    await updateProfile(currentUser, { displayName });
    //1.fireAuth영역 업데이트
    await updateProfile(currentUser, {
      displayName,
    });
    //2.store의 USER 컬렉션 업데이트
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      displayName,
    });
    setUser({
      ...(user as User),
      displayName,
    });
    window.alert("닉네임이 변경되었습니다!");
  };
  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <div css={containerStyles}>
      <Spacing size={56} />
      <Top
        title="나의정보"
        subTitle={`${user?.displayName}님의 프로필을 수정할 수 있습니다.`}
      ></Top>
      <Flex justify="center" direction="column" align="center">
        <ProfileImage size={160} mode="upload" />
        <Text typography="t7" color="gray400">
          이미지를 클릭하여 프로필 변경
        </Text>
        <Spacing size={12} />
        <Input value={displayName} onChange={onChange} />
        <Spacing size={12} />
        <Button.Group>
          <Button size="medium" color="error" onClick={handleLogout}>
            로그아웃
          </Button>
          <Button size="medium" onClick={handleChangeDisplayName}>
            수정하기
          </Button>
        </Button.Group>
      </Flex>
    </div>
  );
}

const containerStyles = css`
  height: 100vh;
  padding: 0 12px;
`;
export default MyPage;
