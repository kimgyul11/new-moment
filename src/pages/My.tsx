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
      <Spacing size={16} />
      <Button.Group>
        <Button>나의 프로필</Button>
        <Button>좋아요한 게시물</Button>
        <Button>친구의 게시물 </Button>
      </Button.Group>
      <Top title="나의정보" subTitle="프로필을 수정해보세요!"></Top>
      <Flex justify="center" direction="column" align="center">
        <ProfileImage size={160} mode="upload" />
        <Input value={user?.displayName} />
        <Button size="medium" color="error" onClick={handleLogout}>
          로그아웃
        </Button>
      </Flex>
    </>
  );
}

export default MyPage;
