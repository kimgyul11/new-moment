import MomentItem from "@/components/home/MomentItem";
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
  console.log(moment);
  return (
    <div>
      <MomentItem moment={moment} />
      {moment.comment && moment.comment.map((item) => <p>{item.comment}</p>)}
    </div>
  );
}

export default MomentPage;
