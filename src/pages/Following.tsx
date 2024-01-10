import FollowingMomentList from "@/components/following/FollowingMomentList";
import Spacing from "@shared/Spacing";
import Text from "@shared/Text";
import Top from "@shared/Top";
import useUser from "@/hooks/auth/useUser";
import { css } from "@emotion/react";
import Flex from "@/components/shared/Flex";

function FollowingPage() {
  const user = useUser();

  return (
    <div css={containerStyles}>
      <Spacing size={80} backgroundColor="gray200" />
      <Top
        title="친구의 모멘트👫"
        subTitle="팔로잉중인 친구의 활동을 확인해보세요"
      />
      <Spacing size={12} backgroundColor="gray200" />
      {user ? (
        <FollowingMomentList userId={user.uid} />
      ) : (
        <Flex align="center" justify="center">
          <Text>로그인이 필요합니다.</Text>
        </Flex>
      )}
    </div>
  );
}
const containerStyles = css`
  min-height: 100vh;
`;

export default FollowingPage;
