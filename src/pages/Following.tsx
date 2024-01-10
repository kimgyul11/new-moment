import FollowingMomentList from "@/components/following/FollowingMomentList";
import Spacing from "@shared/Spacing";
import Text from "@shared/Text";
import Top from "@shared/Top";
import useUser from "@/hooks/auth/useUser";

function FollowingPage() {
  const user = useUser();

  return (
    <div>
      <Spacing size={80} backgroundColor="gray200" />
      <Top
        title="친구의 모멘트👫"
        subTitle="팔로잉중인 친구의 활동을 확인해보세요"
      />
      <Spacing size={12} backgroundColor="gray200" />
      {user ? (
        <FollowingMomentList userId={user.uid} />
      ) : (
        <Text>로그인이 필요합니다.</Text>
      )}
    </div>
  );
}

export default FollowingPage;
