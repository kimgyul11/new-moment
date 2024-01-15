import IconButton from "../shared/IconButton";
import useFollow from "./hooks/useFollow";
import useUser from "@/hooks/auth/useUser";

function FollowingButton({ momentWriter }: { momentWriter: string }) {
  const { data, isLoading, follow, unFollow } = useFollow({ momentWriter });
  const user = useUser();

  //로그인이 안되있거나 , 로그인 유저가 모멘트 작성자와 같으면 아무것도 표시하지 않는다.
  if (!user || momentWriter === user?.uid) {
    return null;
  }

  if (isLoading) {
    return <p>불러오는중..</p>;
  }

  return (
    <div>
      {data && data.includes(user.uid) ? (
        <IconButton
          iconUrl={
            "https://cdn3.iconfinder.com/data/icons/twitter-ui/48/jee01-27-512.png"
          }
          color="blue500"
          text={"팔로잉 중"}
          onClick={() =>
            unFollow({ userId: user.uid, followingId: momentWriter })
          }
        />
      ) : (
        <p
          onClick={() =>
            follow({ userId: user.uid, followingId: momentWriter })
          }
        >
          <IconButton
            iconUrl={
              "https://cdn3.iconfinder.com/data/icons/twitter-ui/48/jee01-26-512.png"
            }
            text={"팔로우"}
            onClick={() =>
              follow({ userId: user.uid, followingId: momentWriter })
            }
          />
        </p>
      )}
    </div>
  );
}

export default FollowingButton;
