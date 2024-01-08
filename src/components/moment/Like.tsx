import useUser from "@/hooks/auth/useUser";
import useLike from "./hooks/useLike";
import IconButton from "../shared/IconButton";

function LikeButton({ momentId }: { momentId: string }) {
  const user = useUser();
  const { like, unlike, moment, isLoading } = useLike({ momentId });

  if (!moment || isLoading) {
    return null;
  }

  //로그인 정보 없을때
  if (user == null) {
    return (
      <IconButton
        text={moment.likeCount ?? 0}
        iconUrl="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-512.png"
        onClick={() => window.alert("로그인 후 이용가능합니다.")}
      />
    );
  }

  return (
    <IconButton
      iconUrl={
        moment.likes?.includes(user.uid)
          ? "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
          : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-512.png"
      }
      text={moment.likeCount ?? 0}
      onClick={() =>
        moment.likes?.includes(user.uid)
          ? unlike({ momentId, likeCount: moment.likeCount ?? 0 })
          : like({ momentId, likeCount: moment.likeCount ?? 0 })
      }
    />
  );
}

export default LikeButton;
