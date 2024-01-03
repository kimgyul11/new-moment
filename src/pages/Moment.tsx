import MomentItem from "@/components/home/MomentItem";
import Comment from "@/components/moment/Comment";
import Form from "@/components/moment/Form";
import Button from "@/components/shared/Button";
import Flex from "@/components/shared/Flex";
import InputBox from "@/components/shared/InputBox";
import Spacing from "@/components/shared/Spacing";
import { getMoment } from "@/remote/moment";
import { colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
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

      {/* <Form /> */}
      {/* commnets */}

      {/* {moment.comment ? (
        moment.comment.map((item) => <p>{item.comment}</p>)
      ) : (
        <p>아직 댓글이 없어요!</p>
      )} */}
    </div>
  );
}

export default MomentPage;
