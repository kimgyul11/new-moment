import Spacing from "@/components/shared/Spacing";
import Top from "@/components/shared/Top";
import { css } from "@emotion/react";

function NotificationPage() {
  return (
    <div css={wrap}>
      <Spacing size={56} />
      <Top title="새로운 모멘트" subTitle="지금 알림 확인하기" />
    </div>
  );
}
const wrap = css`
  height: 100vh;
`;
export default NotificationPage;
