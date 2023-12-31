import MomentItem from "@/components/home/MomentItem";
import Comment from "@/components/moment/Comment";
import Spacing from "@/components/shared/Spacing";
import { getMoment } from "@/remote/moment";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function MomentPage() {
  const { id } = useParams() as { id: string };
  const { data: moment, isLoading } = useQuery(["moment", id], () =>
    getMoment(id)
  );

  if (isLoading || moment == null) {
    return null;
  }

  return (
    <div>
      <Spacing size={56} />
      {/* 본문 */}
      <MomentItem moment={moment} />
      {/* 댓글 */}
      <Comment momentId={moment.id} />
    </div>
  );
}

export default MomentPage;
