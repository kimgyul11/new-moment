import Flex from "@shared/Flex";
import ListRow from "@shared/ListRow";
import Spacing from "@shared/Spacing";
import Text from "@shared/Text";
import Top from "@shared/Top";
import useUser from "@/hooks/auth/useUser";
import useNotification from "@/hooks/notification/useNotification";
import { colors } from "@/styles/colorPalette";
import formatDate from "@/utils/formatTime";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function NotificationPage() {
  const navigate = useNavigate();
  const user = useUser();
  const { notifications, loadingNotifications, read, remove } =
    useNotification();
  const render = useCallback(() => {
    if (!user) {
      return (
        <Text display="block" textAlign="center">
          로그인 후 사용할 수 있습니다.
        </Text>
      );
    }
    if (loadingNotifications) {
      return <ListRow.Skeleton topWidth={300} />;
    }

    return notifications?.length === 0 ? (
      <>
        <Spacing size={16} />
        <Text
          display="block"
          textAlign="center"
          color="gray400"
          typography="t7"
        >
          아무런 알림이 없습니다.
        </Text>
      </>
    ) : (
      notifications?.map((notification) => (
        <Flex justify="space-between" align="center" key={notification.id}>
          <ListRow
            left={notification.isRead ? null : <Dot />}
            contents={
              <ListRow.Texts
                typography="t7"
                title={notification.content}
                subTitle={formatDate(notification.createdAt)}
              />
            }
            cursor={true}
            onClick={() => {
              read(notification.id);
              navigate(notification.url);
            }}
          />
          <Flex>
            <Text
              typography="t7"
              onClick={() => read(notification.id)}
              style={{ cursor: "pointer" }}
            >
              읽음
            </Text>
            <Spacing size={6} direction="horizontal" />
            <Text
              typography="t7"
              color="red"
              style={{ cursor: "pointer" }}
              onClick={() => remove(notification.id)}
            >
              삭제
            </Text>
          </Flex>
        </Flex>
      ))
    );
  }, [user, notifications, loadingNotifications]);

  return (
    <div css={wrap}>
      <Spacing size={56} />
      <Top title="새로운 소식💌" subTitle="새로운 알림을 확인해주세요" />
      <Spacing size={2} backgroundColor="gray200" />
      {render()}
    </div>
  );
}
const wrap = css`
  height: 100vh;
  padding: 0px 12px;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  background: ${colors.blue500};
  border-radius: 50%;
`;
export default NotificationPage;
