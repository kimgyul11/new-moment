import FixedBottomButton from "@/components/shared/FixedBottomButton";
import Top from "@/components/shared/Top";
import styled from "@emotion/styled";

function WritePage() {
  return (
    <Container>
      <Top title="기록하기" subTitle="순간을 기록해보세요" />
      {/* 이미지영역 */}
      {/* 본문 영역 */}
      {/* 태그 영역 */}
      <FixedBottomButton label="작성하기" onClick={() => {}} />
    </Container>
  );
}
const Container = styled.div`
  padding-top: 70px;
`;
export default WritePage;
