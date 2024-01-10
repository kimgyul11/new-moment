import LikeMomentList from "@/components/like/LikeMomentList";
import Text from "@/components/shared/Text";
import useUser from "@/hooks/auth/useUser";
import Spacing from "@shared/Spacing";
import Top from "@shared/Top";

function LikePage() {
  const user = useUser();
  return (
    <div>
      <Spacing size={68} backgroundColor="gray200" />
      <Top title="관심있는 순간" subTitle="좋아요한 모멘트를 확인해보세요!" />
      <Spacing size={4} backgroundColor="gray200" />
      {user ? (
        <LikeMomentList userId={user.uid} />
      ) : (
        <Text>로그인이 필요합니다!</Text>
      )}
    </div>
  );
}

export default LikePage;
