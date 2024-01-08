import { countComment } from "@/remote/comment";
import { useQuery } from "react-query";
import IconButton from "../shared/IconButton";
import { useNavigate } from "react-router-dom";

function CommentButton({ momentId }: { momentId: string }) {
  const navigate = useNavigate();
  const { data } = useQuery(["commentCount", momentId], () =>
    countComment({ momentId })
  );
  return (
    <IconButton
      iconUrl="https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Comments-512.png"
      text={data}
      onClick={() => navigate(`/moments/${momentId}`)}
    />
  );
}

export default CommentButton;
