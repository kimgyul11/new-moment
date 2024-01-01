import Top from "@shared/Top";
import MomentList from "@components/home/MomentList";
import { css } from "@emotion/react";
import Carousel from "@/components/home/Carousel";
import Spacing from "@/components/shared/Spacing";

function Home() {
  return (
    <div>
      <Top
        title="베스트 모멘트!"
        subTitle="지금 가장 인기있는 순간들을 확인해보세요!"
      />
      <Carousel />
      <Spacing size={16} />
      <MomentList />
    </div>
  );
}

export default Home;
