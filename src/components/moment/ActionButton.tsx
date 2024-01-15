import useMoment from "@hooks/moment/useMoment";
import useUser from "@hooks/auth/useUser";
import Flex from "@shared/Flex";

import { useNavigate, useParams } from "react-router-dom";
import { Moment } from "@/models/moment";

import LikeButton from "./Like";
import CommentButton from "./CommentButton";
import Spacing from "../shared/Spacing";
import IconButton from "../shared/IconButton";

function ActionButton({ moment }: { moment: Moment }) {
  const user = useUser();
  const { remove } = useMoment();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Flex justify="space-between">
      {user?.uid === moment.userId ? (
        <Flex>
          <IconButton
            iconUrl="https://cdn1.iconfinder.com/data/icons/jumpicon-basic-ui-filled-line-1/32/-_Trash-Can--512.png"
            color="red"
            text="삭제"
            onClick={() => {
              const ok = window.confirm("정말 삭제하시겠습니까?");
              if (!ok) return;
              if (params.id == null) {
                remove({ userId: user.uid, momentId: moment.id });
              } else {
                remove({ userId: user.uid, momentId: moment.id });
                navigate("/", { replace: true });
              }
            }}
          />
          <Spacing size={6} direction="horizontal" />
          <IconButton
            iconUrl="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-3-512.png"
            text="수정"
            color="black"
            onClick={() => navigate(`/moments/edit/${moment.id}`)}
          />
        </Flex>
      ) : (
        <Flex></Flex>
      )}
      <Flex align="center">
        <CommentButton momentId={moment.id} />
        <Spacing size={6} direction="horizontal" />
        <LikeButton momentId={moment.id} />
      </Flex>
    </Flex>
  );
}

export default ActionButton;
