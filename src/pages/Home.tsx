import Top from "@shared/Top";
import MomentList from "@components/home/MomentList";
import { css } from "@emotion/react";
function Home() {
  return (
    <div>
      <Top
        title="베스트 모멘트!"
        subTitle="지금 가장 인기있는 순간들을 확인해보세요!"
      />
      {/* 캐러셀 영역 */}
      <MomentList />
    </div>
  );
}

export default Home;
