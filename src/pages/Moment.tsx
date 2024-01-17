import MomentItem from "@/components/home/MomentItem";
import Comment from "@/components/moment/Comment";
import KakaoButton from "@/components/moment/KakaoButton";
import Spacing from "@/components/shared/Spacing";
import { getMoment } from "@/remote/moment";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

function MomentPage() {
  const { id } = useParams() as { id: string };
  const { data: moment, isLoading } = useQuery(
    ["moment", id],
    () => getMoment(id),
    { enabled: !!id }
  );

  if (isLoading || moment == null) {
    return null;
  }

  return (
    <div>
      <Spacing size={70} backgroundColor="gray200" />
      {/* 본문 */}
      <MomentItem moment={moment} />
      {/* 카카오톡 공유하기 */}
      <KakaoButton moment={moment} />
      {/* 댓글 */}
      <Comment moment={moment} />
      <Spacing size={120} />
    </div>
  );
}

export default MomentPage;
