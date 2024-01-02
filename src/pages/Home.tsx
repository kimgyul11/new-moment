import Top from "@shared/Top";
import MomentList from "@components/home/MomentList";
import Carousel from "@/components/home/Carousel";
import Spacing from "@/components/shared/Spacing";
import FixedBottomBar from "@/components/shared/FixedBottomBar";
import styled from "@emotion/styled";

function Home() {
  return (
    <Container>
      <Top
        title="베스트 모멘트!"
        subTitle="지금 가장 인기있는 순간들을 확인해보세요!"
      />
      <Carousel />
      <Spacing size={12} backgroundColor="gray200" />
      <MomentList />
      <FixedBottomBar />
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 52px;
`;

export default Home;
