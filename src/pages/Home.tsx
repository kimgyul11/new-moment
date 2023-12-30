import Top from "@shared/Top";
import MomentList from "@components/home/MomentList";
import { css } from "@emotion/react";
function Home() {
  return (
    <div css={componentStyle}>
      <Top title="베스트 모멘트!" subTitle="지금 가장 인기있는 순간들"></Top>
      {/* 캐러셀 영역 */}
      <MomentList />
    </div>
  );
}
const componentStyle = css`
  padding: 0px 16px;
  background-color: green;
`;

export default Home;
