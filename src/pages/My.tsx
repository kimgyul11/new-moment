import Button from "@/components/shared/Button";
import Flex from "@/components/shared/Flex";
import Input from "@/components/shared/Input";
import ProfileImage from "@/components/shared/ProfileImage";
import Spacing from "@/components/shared/Spacing";
import Top from "@/components/shared/Top";
import useUser from "@/hooks/auth/useUser";
import { auth } from "@/remote/firebase";
import { signOut } from "firebase/auth";

function MyPage() {
  const user = useUser();
  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <>
      <Spacing size={56} />
      <Top title="나의정보" subTitle="프로필을 수정할 수 있습니다."></Top>
      <Flex justify="center" direction="column" align="center">
        <ProfileImage size={160} mode="upload" />
        <Input defaultValue={user?.displayName} />
        <Button size="medium" color="error" onClick={handleLogout}>
          로그아웃
        </Button>
      </Flex>
      <Top title="나의 모멘트" subTitle="소중한 순간들을 확인해보세요" />
    </>
  );
}

export default MyPage;
