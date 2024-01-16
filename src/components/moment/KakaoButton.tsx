import useShare from "@/hooks/kakao/useShare";
import Flex from "../shared/Flex";
import Button from "../shared/Button";
import Spacing from "../shared/Spacing";
import { Moment } from "@/models/moment";
import { format } from "date-fns";

function KakaoButton({ moment }: { moment: Moment }) {
  const share = useShare();
  const { text, image, createdAt } = moment;
  return (
    <Flex direction="column">
      <Spacing size={6} />
      <Button
        onClick={() => {
          share({
            title: `${format(createdAt, "yyyy-MM-dd")}에 기록된 순간`,
            description: text,
            imageUrl: image,
            buttonLable: "Moment에서 확인해보기",
          });
        }}
      >
        카카오톡으로 공유하기
      </Button>
    </Flex>
  );
}

export default KakaoButton;
