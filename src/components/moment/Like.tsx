import useUser from "@/hooks/auth/useUser";
import { colors } from "@/styles/colorPalette";
import Text from "@shared/Text";
import Flex from "@shared/Flex";
import { css } from "@emotion/react";
import useLike from "./hooks/useLike";

function Like({ momentId }: { momentId: string }) {
  const user = useUser();

  const { like, unlike, moment, isLoading } = useLike({ momentId });
  if (!moment || isLoading) {
    return null;
  }

  //로그인 정보 없을때
  if (user == null) {
    return (
      <Button
        likeCount={moment.likeCount ?? 0}
        iconUrl="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-512.png"
        onClick={() => window.alert("로그인 후 이용가능합니다.")}
      />
    );
  }
  console.log(moment.id);

  return (
    <Button
      iconUrl={
        moment.likes?.includes(user.uid)
          ? "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
          : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-512.png"
      }
      likeCount={moment?.likeCount ?? 0}
      onClick={() =>
        moment.likes?.includes(user.uid)
          ? unlike({ momentId, likeCount: moment.likeCount ?? 0 })
          : like({ momentId, likeCount: moment.likeCount ?? 0 })
      }
    />
  );
}

function Button({
  iconUrl,
  likeCount,
  onClick,
}: {
  iconUrl: string;
  likeCount: number;
  onClick?: () => void;
}) {
  return (
    <Flex
      onClick={onClick}
      css={ButtonContainer}
      justify="center"
      align="center"
    >
      <img src={iconUrl} alt="" />
      <Text typography="t7" color={likeCount > 0 ? "red100" : "gray400"}>
        {likeCount}
      </Text>
    </Flex>
  );
}

const ButtonContainer = css`
  cursor: pointer;
  border: 1px solid ${colors.gray300};
  border-radius: 6px;
  height: 25px;
  width: 50px;
  img {
    margin-right: 5px;
    margin-bottom: 2px;
    width: 15px;
    height: 15px;
  }
`;

export default Like;
