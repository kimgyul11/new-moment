import useFollow from "./hooks/useFollow";
import useUser from "@/hooks/auth/useUser";

function FollowingButton({ momentWriter }: { momentWriter: string }) {
  const { data, isLoading, follow, unFollow } = useFollow({ momentWriter });
  const user = useUser();

  //로그인이 안되있거나 , 로그인 유저가 모멘트 작성자와 같으면 null
  if (!user || momentWriter === user?.uid) {
    return null;
  }

  if (isLoading) {
    return <p>불러오는중..</p>;
  }

  return (
    <div>
      {data && data.includes(user.uid) ? (
        <p
          onClick={() =>
            unFollow({ userId: user.uid, followingId: momentWriter })
          }
        >
          팔로잉 중..
        </p>
      ) : (
        <p
          onClick={() =>
            follow({ userId: user.uid, followingId: momentWriter })
          }
        >
          팔로우
        </p>
      )}
    </div>
  );
}

export default FollowingButton;
