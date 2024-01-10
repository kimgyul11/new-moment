import LikeMomentList from "@/components/like/LikeMomentList";
import Text from "@/components/shared/Text";
import useUser from "@/hooks/auth/useUser";
import Spacing from "@shared/Spacing";
import Top from "@shared/Top";

function LikePage() {
  const user = useUser();
  return (
    <div>
      <Spacing size={80} backgroundColor="gray200" />
      <Top title="저장한 모멘트❤️" subTitle="좋아요한 모멘트를 확인해보세요!" />
      <Spacing size={12} backgroundColor="gray200" />
      {user ? (
        <LikeMomentList userId={user.uid} />
      ) : (
        <Text>로그인이 필요합니다!</Text>
      )}
    </div>
  );
}

export default LikePage;
