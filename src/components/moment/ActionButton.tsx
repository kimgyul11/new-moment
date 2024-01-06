import useMoment from "@hooks/moment/useMoment";
import useUser from "@hooks/auth/useUser";
import Flex from "@shared/Flex";
import Spacing from "@shared/Spacing";
import Text from "@shared/Text";

import { useNavigate, useParams } from "react-router-dom";
import { Moment } from "@/models/moment";
import styled from "@emotion/styled";
import { Colors, colors } from "@/styles/colorPalette";
import { css } from "@emotion/react";
import { color } from "framer-motion";

function ActionButton({ moment }: { moment: Moment }) {
  const user = useUser();
  const { remove } = useMoment();
  const params = useParams();
  const navigate = useNavigate();

  return (
    <Flex justify="space-between">
      {user?.uid === moment.userId ? (
        <Flex>
          <Button
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
            iconUrl="https://cdn2.iconfinder.com/data/icons/app-user-interface-6/48/Trash-512.png"
            color="red100"
          />
          {/* <Button>수정</Button> */}
        </Flex>
      ) : (
        <Flex></Flex>
      )}
      <Flex>
        <Button
          color="blue"
          iconUrl="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Message-512.png"
        ></Button>
        <Button iconUrl="https://cdn0.iconfinder.com/data/icons/essentials-9/128/__Message-512.png"></Button>
      </Flex>
    </Flex>
  );
}

function Button({
  color,
  iconUrl,
  onClick,
}: {
  color?: Colors;
  iconUrl: string;
  onClick?: () => void;
}) {
  return (
    <ButtonContainer onClick={onClick} color={color || "gray200"}>
      <img src={iconUrl} alt="" />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  cursor: pointer;
  background-color: ${(props: { color: Colors }) =>
    props.color || "transparent"};
  border: 1px solid ${colors.gray300};
  display: flex;
  border-radius: 999px;
  padding: 5px;
  overflow: hidden;

  img {
    object-fit: contain;
    width: 15px;
    height: 15px;
  }
`;

export default ActionButton;
